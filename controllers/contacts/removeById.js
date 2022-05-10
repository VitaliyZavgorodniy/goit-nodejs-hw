const createError = require("http-errors");

const contactsOperations = require("../../models/contacts");

const removeById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await contactsOperations.removeContact(id);

    if (!result) {
      throw createError(404, `Product ${id} not found`);
    }

    res.json({
      status: "success",
      code: 200,
      data: {
        result: result,
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = removeById;
