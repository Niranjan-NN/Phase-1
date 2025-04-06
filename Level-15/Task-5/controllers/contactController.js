const Contact = require("../models/contactModel");

// Add new contact
exports.addContact = async (req, res) => {
  try {
    const { name, email, phone, address, group } = req.body;
    if (!name) return res.status(400).json({ message: "Name is required" });

    const contact = new Contact({ name, email, phone, address, group });
    await contact.save();
    res.status(201).json(contact);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all contacts
exports.getAllContacts = async (req, res) => {
  try {
    const { group } = req.query;
    const filter = group ? { group } : {};
    const contacts = await Contact.find(filter);
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Search contacts
exports.searchContacts = async (req, res) => {
  try {
    const { q } = req.query;
    const contacts = await Contact.find({
      $or: [
        { name: new RegExp(q, "i") },
        { email: new RegExp(q, "i") },
        { phone: new RegExp(q, "i") },
        { address: new RegExp(q, "i") }
      ]
    });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update contact
exports.updateContact = async (req, res) => {
  try {
    const updated = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Contact not found" });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete contact
exports.deleteContact = async (req, res) => {
  try {
    const deleted = await Contact.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Contact not found" });
    res.json({ message: "Contact deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
