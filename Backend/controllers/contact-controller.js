const Contact = require('../model/contact-model');

exports.createContact = async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        // Validate the input data
        if (!name || !email || !subject || !message) {
            return res.status(400).json({ message: "All fields are required." });
        }

        // Create a new contact form entry
        const newContact = new Contact({
            name,
            email,
            subject,
            message
        });

        // Save to the database
        await newContact.save();
        return res.status(201).json({ message: 'Your message has been sent successfully.' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.getContacts = async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.status(200).json(contacts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to retrieve contacts' });
    }
};
