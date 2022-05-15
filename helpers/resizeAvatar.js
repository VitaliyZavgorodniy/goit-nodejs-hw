const fs = require("fs/promises");
const createError = require("http-errors");
const Jimp = require("jimp");
const { v4: uuidv4 } = require("uuid");

const resizeAvatar = async ({ path }) => {
  const avatarPath = await Jimp.read(path)
    .then((lenna) => {
      const filePath = path.split(".");
      const fileType = filePath[filePath.length - 1].toLowerCase();

      const fileName = `${uuidv4()}.${fileType}`;

      lenna.resize(250, 250).quality(80).write(`./public/avatars/${fileName}`);

      fs.unlink(path);

      return fileName;
    })
    .catch((err) => {
      throw createError(500, err.message);
    });

  return avatarPath;
};

module.exports = resizeAvatar;
