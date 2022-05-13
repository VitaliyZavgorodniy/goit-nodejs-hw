const { contactsService } = require("../../services");

const service = new contactsService();

class contactsController {
  getAll = async (req, res) => {
    const { _id } = req?.user;

    const result = await service.getAllContacts(_id);

    res.status(200).json({ status: "success", code: 200, result });
  };

  getById = async (req, res) => {
    const { id } = req.params;

    const result = await service.getContactById(id);

    res.status(200).json({ status: "success", code: 200, result });
  };

  add = async (req, res) => {
    const { _id } = req?.user;

    const result = await service.addContact({
      ...req.body,
      owner: _id,
    });

    res.status(201).json({ status: "success", code: 201, result });
  };

  removeById = async (req, res) => {
    const { id } = req.params;

    const result = await service.removeContact(id);

    res.status(200).json({ status: "success", code: 200, result });
  };

  updateById = async (req, res) => {
    const { id } = req.params;

    const result = await service.updateContact(id, req.body);

    res.status(200).json({ status: "success", code: 200, result });
  };

  updateFavoriteById = async (req, res) => {
    const { id } = req.params;

    const result = await service.updateContactFavorite(id, req.body);

    res.status(200).json({ status: "success", code: 200, result });
  };
}

module.exports = contactsController;
