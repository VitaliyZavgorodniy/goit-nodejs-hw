const { Contact } = require("../../models/contact");

const getAll = async (req, res) => {
  const result = await Contact.find({}, "-createdAt -updatedAt");

  res.status(201).json({ status: "success", code: 201, result });
};

module.exports = getAll;
