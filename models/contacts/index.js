const { promises: fs } = require("fs");
const path = require("path");
const uuid = require("uuid");

const contactsPath = path.join(__dirname, "./contacts.json");

const writeInFile = async (list) => {
  const data = JSON.stringify(list);
  await fs.writeFile(contactsPath, data);
};

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    return JSON.parse(data);
  } catch (err) {
    throw err;
  }
};

const getContactById = async (contactId) => {
  const list = await listContacts();
  const contact = list.find((item) => item.id === contactId);

  return contact ?? null;
};

const addContact = async (name, email, phone) => {
  const list = await listContacts();
  const newList = [...list, { id: uuid.v4(), name, email, phone }];

  await writeInFile(newList);
  return newList;
};

const removeContact = async (contactId) => {
  const list = await listContacts();

  const index = list.findIndex((item) => item.id === contactId);
  if (index === -1) return null;
  const [newList] = list.splice(index, 1);

  await writeInFile(newList);
  return newList;
};

const updateContact = async (contactId, name, email, phone) => {
  const data = await listContacts();

  const contact = data.find((item) => item.id === contactId);
  if (!contact) return null;

  contact.name = name;
  contact.email = email;
  contact.phone = phone;

  await writeInFile(data);
  return contact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
