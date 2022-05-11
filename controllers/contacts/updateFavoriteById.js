const { NotFound } = require("http-errors");

const { Contact } = require("../../models/contact");

const updateFavoriteById = async (req, res) => {
  const { id } = req.params;

  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw NotFound(`Contact ${id} not found!`);
  }

  res.status(200).json({ status: "success", code: 200, result });
};

module.exports = updateFavoriteById;
