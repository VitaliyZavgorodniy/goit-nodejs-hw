const asyncHandler = require("express-async-handler");
const { NotFound } = require("http-errors");

const { Contact } = require("../../models/contact");

class contactsService {
  getAllContacts = asyncHandler(async (id) => {
    const result = await Contact.find({ owner: id }, "-createdAt -updatedAt");

    return result;
  });

  getContactById = asyncHandler(async (id, userID) => {
    const result = await Contact.findOne(
      { _id: id, owner: userID },
      "-createdAt -updatedAt"
    );

    if (!result) {
      throw NotFound("Not found");
    }

    return result;
  });

  addContact = asyncHandler(async (data) => {
    const result = await Contact.create(data);

    return result;
  });

  removeContact = asyncHandler(async (id) => {
    const result = await Contact.findByIdAndRemove(id);

    if (!result) {
      throw NotFound(`Contact ${id} not found`);
    }

    return result;
  });

  updateContact = asyncHandler(async (id, data) => {
    const result = await Contact.findByIdAndUpdate(id, data, { new: true });

    if (!result) {
      throw NotFound(`Contact ${id} not found!`);
    }

    return result;
  });

  updateContactFavorite = asyncHandler(async (id, value) => {
    const result = await Contact.findByIdAndUpdate(id, value, { new: true });

    if (!result) {
      throw NotFound(`Contact ${id} not found!`);
    }

    return result;
  });
}

module.exports = contactsService;
