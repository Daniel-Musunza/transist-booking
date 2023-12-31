const express = require('express');
const router = express.Router();
const {
  addbooking,
  getbookings
} = require('../controllers/bookingController');


router.route('/').get(getbookings).post(addbooking);

module.exports = router;
