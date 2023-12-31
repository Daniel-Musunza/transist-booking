const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const db = require('../config/db'); // Your MySQL connection

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, "abc123", {
    expiresIn: '30d',
  });
  
};

// @desc    Register new user
// @route   POST /api/users/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  
  try {
    const { transist_type, number_plate, phone_number, space, from, to, departure_date, price , password} = req.body;

    if (!transist_type || !number_plate || !phone_number || !space || !from || !to || !departure_date || !price || !password) {
      res.status(400);
      throw new Error('Please add all fields');
    }
    
    let coverPhoto = null;
    if(req.file){
      coverPhoto = req.file.filename; 
      // Access the uploaded file via multer
    }
    // Check if user exists
    const checkUserQuery = 'SELECT * FROM users WHERE number_plate = ?';
    const existingUser = await db.query(checkUserQuery, [number_plate]);

    if (existingUser.length > 0) {
      res.status(400);
      throw new Error('Vehicle already exists');
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Insert user into the database
    const insertUserQuery = `
    INSERT INTO users (transist_type, number_plate, phone_number, space, \`from\`, \`to\`, departure_date, price,  coverPhoto, password)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  

    const insertUserValues = [
      transist_type, 
      number_plate,
      phone_number, 
      space, 
      from, 
      to, 
      departure_date, 
      price, 
      coverPhoto,
      hashedPassword,
    ];

    const result = await db.query(insertUserQuery, insertUserValues);

    if (result.affectedRows === 1) {
      const userId = result.insertId;
      const token = generateToken(userId);

      res.status(201).json({
        id: userId,
        transist_type, 
        number_plate,
        phone_number, 
        space, 
        from, 
        to, 
        departure_date, 
        price, 
        coverPhoto : coverPhoto,
        token,
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
      throw new Error('Invalid user data');
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});


// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  try {
    const { number_plate, password } = req.body;

    // Check for user email
    const getUserQuery = 'SELECT * FROM users WHERE number_plate = ?';
    const users = await db.query(getUserQuery, [number_plate]);

    if (users.length === 1 && (await bcrypt.compare(password, users[0].password))) {
      const user = users[0];
      const token = generateToken(user.id);

      res.json({
        id: user.id,
        transist_type: user.transist_type, 
        number_plate: user.number_plate,
        phone_number: user.phone_number, 
        space: user.space, 
        from: user.from, 
        to: user.to, 
        departure_date: user.departure_date, 
        price: user.price,
        coverPhoto : user.coverPhoto,
        token,
      });
    } else {
      res.status(400).json({ message: 'Invalid credentials' });
      throw new Error('Invalid credentials');
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
  try {
    const userId = req.user.id;
    const getUserQuery = 'SELECT * FROM users WHERE id = ?';
    const users = await db.query(getUserQuery, [userId]);

    if (users.length === 1) {
      const user = users[0];
      res.status(200).json(user);
    } else {
      res.status(404);
      throw new Error('User not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

const getUsers = asyncHandler(async (req, res) => {
  try {
    const getAllUsersQuery = 'SELECT * FROM users';
    const users = await db.query(getAllUsersQuery);

    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

const updateUser = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const { 
      transist_type, 
      number_plate,
      phone_number, 
      space, 
      from, 
      to, 
      departure_date, 
      price, 
      password} = req.body;

      let coverPhoto = null;
      if(req.file){
        return coverPhoto = req.file.filename; 
        // Access the uploaded file via multer
      }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const updateUserQuery = 'UPDATE users SET transist_type = ?, number_plate = ?, phone_number = ?, space = ?, from = ?, to = ?, departure_date = ?, price = ?, password = ?, coverPhoto = ? WHERE id = ?'
    await db.query(updateUserQuery, [
        transist_type, 
        number_plate,
        phone_number, 
        space, 
        from, 
        to, 
        departure_date, 
        price, 
        coverPhoto,
        hashedPassword,
         id
        ]);

    res.json({ message: 'User updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});



  
// };
console.log(generateToken);
module.exports = {
  registerUser,
  loginUser,
  getMe,
  getUsers,
  updateUser,
};
