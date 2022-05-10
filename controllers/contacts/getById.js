const { NotFound } = require("http-errors");

const contactsOperations = require("../../models/contacts");

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const contact = await contactsOperations.getContactById(id);

    if (!contact) throw NotFound("Not found");

    res.status(200).json({
      status: "success",
      code: 200,
      data: contact,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = getById;
