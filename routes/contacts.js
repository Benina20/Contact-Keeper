const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

const User = require('../models/User');
const Contacts = require('../models/Contacts');

//route   GET api/contat
//access  private
router.get('/', auth, async (req, res) => {
  try {
    const contacts = await Contacts.find({ user: req.user.id }).sort({
      date: -1,
    });
    res.json(contacts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//route   GET api/user
//access  private
router.post(
  '/',
  [auth, [check('name', 'Name is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, phone, type } = req.body;

    try {
      const newContact = new Contacts({
        name,
        email,
        phone,
        type,
        user: req.user.id,
      });

      const contact = await newContact.save();

      res.json(contact);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

//route   put api/contat/:id
//access  private
router.put('/:id', auth, async (req, res) => {
  const { name, email, phone, type } = req.body;

  //build contact object
  const contactFields = {};
  if (name) contactFields.name = name;
  if (email) contactFields.email = email;
  if (phone) contactFields.phone = phone;
  if (type) contactFields.type = type;

  try {
    let contact = await contact.findById(req.params.id);

    if (!contact) return res.status(404).json({ msg: 'contact not found' });

    //make sure user own scontact
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'not authorized' });
    }

    contact = await Contacts.findOneAndUpdate(
      req.params.id,
      { $set: contactFields },
      { new: true }
    );

    res.json(contact);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//route   delete api/contat/:id
//access  private
router.put('/:id', auth, async (req, res) => {
  try {
    let contact = await contact.findById(req.params.id);

    if (!contact) return res.status(404).json({ msg: 'contact not found' });

    //make sure user owns scontact
    if (contact.use.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'not authorized' });
    }

    await Contacts.findByIdAndRemove(req.params.id);

    res.json({ msg: 'contact removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
