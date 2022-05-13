const asyncHandler = require("express-async-handler");
const createError = require("http-errors");
const bcrypt = require("bcryptjs");

const { jwtGenerator } = require("../../helpers");

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

    const user = await User.create({
      email,
      password: await bcrypt.hash(password, 10),
      subscription,
    });

    const token = jwtGenerator({ id: user._id });
    this.updateUserById(user._id, { token });

    return { token };
  });

  loginUser = asyncHandler(async ({ email, password }) => {
    const user = await this.findUser({ email }, "-createdAt -updatedAt");

    if (!user) {
      throw NotFound("User not found");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw createError(401, "Email or password is wrong");

    const token = jwtGenerator({ id: user._id });
    this.updateUserById(user._id, { token });

    return { token };
  });
}

module.exports = usersService;
