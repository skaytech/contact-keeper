const express = require('express');

const router = express.Router();

/*
@route api/contacts
@desc Fetch the contacts
@access PUBLIC
*/
router.get('/', (req, res) => {
  res.send('GET All Contacts');
});

/*
@route api/contacts
@desc Fetch the contacts
@access PUBLIC
*/
router.post('/', (req, res) => {
  res.send('Add a Contact');
});

/*
@route api/contacts
@desc Fetch the contacts
@access PUBLIC
*/
router.put('/:id', (req, res) => {
  res.send('Modify a contact');
});
/*
@route api/contacts
@desc Fetch the contacts
@access PUBLIC
*/
router.delete('/:id', (req, res) => {
  res.send('Delete a contact');
});

module.exports = router;
