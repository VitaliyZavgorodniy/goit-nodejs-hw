const asyncHandler = require("express-async-handler");
const createError = require("http-errors");
const { NotFound } = require("http-errors");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const { v4: uuidv4 } = require("uuid");

const { jwtGenerator, sendEmail } = require("../../helpers");

const verificationEmail = require("../../emailTemplates/verificationEmail");

const { User } = require("../../models/user");

class usersService {
  findUser = asyncHandler(async (parameter) => {
    const result = await User.findOne(parameter, "-createdAt -updatedAt");

    return result ?? null;
  });

  updateUserById = asyncHandler(async (id, payload) => {
    const result = await User.findByIdAndUpdate(id, payload);

    return result;
  });

  createUser = asyncHandler(async ({ email, password, subscription }) => {
    const result = await this.findUser({ email });

    if (result) {
      throw createError(409, "Email in use!");
    }

    const verificationToken = await this.createVerifyEmail(email);

    const user = await User.create({
      email,
      password: await bcrypt.hash(password, 10),
      avatarURL: gravatar.url(email, {
        s: "250",
      }),
      subscription,
      verificationToken,
    });

    const token = jwtGenerator({ id: user._id });
    this.updateUserById(user._id, { token });

    return { token };
  });

  loginUser = asyncHandler(async ({ email, password }) => {
    const user = await this.findUser({ email }, "-createdAt -updatedAt");

    if (!user.verify) {
      throw createError(400, "User not verified");
    }

    if (!user) {
      throw NotFound("User not found");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw createError(401, "Email or password is wrong");

    const token = jwtGenerator({ id: user._id });
    this.updateUserById(user._id, { token });

    return { token };
  });

  logoutUser = asyncHandler(async (id) => {
    const result = await this.updateUserById(id, { token: null });

    return result;
  });

  patchUserAvatar = asyncHandler(async (id, avatarURL) => {
    await this.updateUserById(id, { avatarURL });

    return avatarURL;
  });

  verifyEmail = asyncHandler(async (verificationToken) => {
    const user = await this.findUser({ verificationToken });

    if (!user) throw NotFound("User not found");

    await this.updateUserById(user._id, {
      verificationToken: null,
      verify: true,
    });

    return "Verification successful";
  });

  resendVerifyEmail = asyncHandler(async (email) => {
    const user = await this.findUser({ email });

    if (!user) throw NotFound("User not found");

    if (user?.verify)
      throw createError(400, "Verification has already been passed");

    const verificationToken = await this.createVerifyEmail(email);

    const result = await this.updateUserById(user._id, {
      verificationToken,
    });

    return result;
  });

  createVerifyEmail = asyncHandler(async (email) => {
    const verificationToken = uuidv4();

    await sendEmail(verificationEmail({ email, verificationToken }));

    return verificationToken;
  });
}

module.exports = usersService;
