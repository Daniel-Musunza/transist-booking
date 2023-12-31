const asyncHandler = require('express-async-handler');
const db = require('../config/db');

const getbookings = asyncHandler(async (req, res) => {
  const query = 'SELECT * FROM bookings';
  const bookings = await db.query(query);
  res.status(200).json(bookings);
});

const addbooking = async (req, res) => {
  try {
    const {
      id,
      phone_number,
      full_names,
      space,
      from,
      to,
      amount,
      number_plate,
      departure_date
    } = req.body;


    if (!id || !phone_number || !full_names) {
      res.status(400).json({ message: 'Please fill in all the required fields' });
      return;
    }

    // Insert the file data into the database
    const insertbookingQuery = `
      INSERT INTO bookings (
        id,
        phone_number,
        full_names,
        space,
        \`from\`,
        \`to\`,
        amount,
        number_plate,
        departure_date
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    await db.query(insertbookingQuery, [
      id,
      phone_number,
      full_names,
      space,
      from,
      to,
      amount,
      number_plate,
      departure_date
    ]);

    const newbooking = {
      id,
      phone_number,
      full_names,
      space,
      from,
      to,
      amount,
      number_plate,
      departure_date
    };

    res.status(200).json(newbooking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};


module.exports = {
  getbookings,
  addbooking
};
