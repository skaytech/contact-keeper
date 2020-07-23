const express = require('express');
const auth = require('../middleware/auth');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const Contact = require('../models/Contact');
const router = express.Router();

/*
@route api/contacts
@desc Fetch the contacts
@access Private
*/
router.get('/', auth, async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user.id }).sort({
      date: -1,
    });
    res.json(contacts);
  } catch (err) {
    console.error(err.message());
    res.status(500).json({ msg: 'Server Error' });
  }
});

/*
@route api/contacts
@desc Add a Contact
@access Private
*/

router.post(
  '/',
  [
    auth,
    [
      body('name', 'Name is required').not().isEmpty(),
      body('email', 'A valid email is required').isEmail(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.sendStatus(400).json({ errors: errors.array() });
    }

    const { name, email, phone, type } = req.body;

    try {
      const newContact = new Contact({
        name,
        email,
        phone,
        type,
        user: req.user.id,
      });

      const contact = await newContact.save();
      res.json(contact);
    } catch (err) {
      console.error(err);
      res.sendStatus(500).json({ msg: 'Server Error' });
    }
  }
);

/*
@route api/contacts
@desc Update a contact
@access Private
*/
router.put('/:id', auth, async (req, res) => {
  const { name, email, phone, type } = req.body;

  const contactFields = {};

  if (name) contactFields.name = name;
  if (email) contactFields.email = email;
  if (phone) contactFields.phone = phone;
  if (type) contactFields.type = type;

  try {
    let contact = await Contact.findById(req.params.id);

    if (!contact)
      return res.sendStatus(404).json({ msg: 'Contact Not Found!' });

    if (contact.user.toString() !== req.user.id) {
      return res.sendStatus(401).json({ msg: 'UnAuthorized' });
    }

    contact = await Contact.findByIdAndUpdate(
      req.params.id,
      {
        $set: contactFields,
      },
      { new: true }
    );

    res.json(contact);
  } catch (err) {
    console.error(err.message());
    res.sendStatus(500).json({ msg: 'Server Error' });
  }
});
/*
@route api/contacts
@desc Delete Contact by Id
@access Private
*/
router.delete('/:id', auth, async (req, res) => {
  try {
    let contact = await Contact.findById(req.params.id);

    if (!contact)
      return res.sendStatus(404).json({ msg: 'Contact Not Found!' });

    if (contact.user.toString() !== req.user.id) {
      return res.sendStatus(401).json({ msg: 'UnAuthorized' });
    }

    await Contact.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Contact Deleted' });
  } catch (err) {
    console.error(err.message());
    res.sendStatus(500).json({ msg: 'Server Error' });
  }
});

module.exports = router;
