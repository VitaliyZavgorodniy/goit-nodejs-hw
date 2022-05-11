const { NotFound } = require("http-errors");

const { Contact } = require("../../models/contact");

const getById = async (req, res) => {
  const { id } = req.params;

  const result = await Contact.findById(id, "-createdAt -updatedAt");
  if (!result) {
    throw NotFound("Not found");
  }

  res.status(200).json({ status: "success", code: 200, result });
};

module.exports = getById;
