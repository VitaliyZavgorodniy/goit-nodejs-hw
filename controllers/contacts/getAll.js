const createError = require("http-errors");

const contactsOperations = require("../../models/contacts");

const getAll = async (req, res, next) => {
  try {
    const list = await contactsOperations.listContacts();

    if (!list) throw createError(500, "Server Error!");

    res.status(200).json({ status: "success", code: 200, data: [...list] });
  } catch (err) {
    next(err);
  }
};

module.exports = getAll;
