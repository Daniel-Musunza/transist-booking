const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const db = require('../config/db');

const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

const sendSMS = async (phoneNumber, bookingDetails) => {
  try {
    const message = await client.messages.create({
      body: `Booking Details:\nBooking ID: ${bookingDetails.id}\nFrom: ${bookingDetails.from}\nTo: ${bookingDetails.to}\nAmount: ${bookingDetails.amount}`,
      from: '+254794711950',
      to: phoneNumber
    });

    console.log(`Message sent with SID: ${message.sid}`);
  } catch (error) {
    console.error(`Error sending SMS: ${error.message}`);
  }
};

const getbookings = asyncHandler(async (req, res) => {
  const query = 'SELECT * FROM bookings';
  const bookings = await db.query(query);
  res.status(200).json(bookings);
});

const addbooking = async (req, res) => {
  try {
    const {
      national_id,
      phone_number,
      secret_code,
      full_names,
      space,
      from,
      to,
      amount,
      number_plate,
      departure_date
    } = req.body;

    if (!national_id || !phone_number || !full_names || !secret_code) {
      res.status(400).json({ message: 'Please fill in all the required fields' });
      return;
    }

    const getUserQuery = 'SELECT * FROM users WHERE number_plate = ?';
    const [user] = await db.query(getUserQuery, [number_plate]);


    const newSpace = user.space - space;

    console.log(user.space + "-" + space + "=" + newSpace);
    
    if(newSpace < 0 ){
      res.status(400).json({ message: 'Space Not enough. please book another truck' });
      return;
    }
   
    const received = null;
    const salt = await bcrypt.genSalt(10);
    const hashedSecretCode = await bcrypt.hash(secret_code, salt);
    // Insert the file data into the database
    const insertbookingQuery = `
      INSERT INTO bookings (
        national_id,
        phone_number,
        secret_code,
        full_names,
        space,
        \`from\`,
        \`to\`,
        amount,
        number_plate,
        departure_date,
        received
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

   const result = await db.query(insertbookingQuery, [
      national_id,
      phone_number,
      hashedSecretCode,
      full_names,
      space,
      from,
      to,
      amount,
      number_plate,
      departure_date,
      received
    ]);

    if (result.affectedRows === 1) {
      const newId = result.insertId;
      const newbooking = {
        id : newId,
        national_id,
        phone_number,
        full_names,
        space,
        from,
        to,
        amount,
        number_plate,
        departure_date,
        received
      };

      await sendSMS(phone_number, newbooking);

      const updateUserQuery = 'UPDATE users SET space = ? WHERE number_plate = ?'
      await db.query(updateUserQuery, [
          newSpace,
          number_plate
      ]);
      res.status(200).json(newbooking);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const searchMyBooking = asyncHandler(async (req, res) => {
  try {
    const { id, secret_code } = req.body;

    if (!secret_code) {
      res.status(400).json({ message: 'Secret code is required' });
      return;
    }

    // Check for user email
    const getBookingQuery = 'SELECT * FROM bookings WHERE id = ?';
    const bookings = await db.query(getBookingQuery, [id]);
    if (bookings.length > 0 && bookings.some(async(booking) => await bcrypt.compare(secret_code, booking.secret_code))) {
      const myBooking = bookings[0];
      
      res.json({
        id: myBooking.id,
        from: myBooking.from,
        to: myBooking.to,
        amount: myBooking.amount,
        space: myBooking.space,
        received: myBooking.received
      });
      
    } else {
      res.status(400).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

const confirmReceived = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const {received} = req.body;

    const updateUserQuery = 'UPDATE bookings SET received = ? WHERE id = ?'
    await db.query(updateUserQuery, [
        received,
        id
    ]);

    res.json({ message: 'Booking updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

const confirmNotReceived = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const {received} = req.body;

    const updateUserQuery = 'UPDATE bookings SET received = ? WHERE id = ?'
    await db.query(updateUserQuery, [
        received,
        id
    ]);


    res.json({ message: 'Booking updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});


module.exports = {
  getbookings,
  addbooking,
  searchMyBooking,
  confirmReceived,
  confirmNotReceived
};
