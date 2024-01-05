const express = require('express');
const router = express.Router();
const {
  addbooking,
  getbookings,
  searchMyBooking,
  confirmReceived,
  confirmNotReceived
} = require('../controllers/bookingController');


router.route('/').get(getbookings).post(addbooking);
router.post('/searchMyBooking', searchMyBooking)
router.route('/received/:id').put(confirmReceived);
router.route('/notReceived/:id').put(confirmNotReceived);

module.exports = router;
