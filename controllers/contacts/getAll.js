const { Contact } = require("../../models/contact");

const getAll = async (req, res) => {
  const result = await Contact.find({}, "-createdAt -updatedAt");

  res.status(200).json({ status: "success", code: 200, result });
};

module.exports = getAll;
