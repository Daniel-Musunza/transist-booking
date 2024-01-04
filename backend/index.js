const path = require('path');
const express = require('express');
const colors = require('colors');
const cors = require('cors');
const dotenv = require('dotenv');
const { errorHandler } = require('./middleware/errorMiddleware');
const db = require('./config/db'); // Import your MySQL db connection setup
const port = process.env.PORT || 5000;

dotenv.config();

const app = express();


const corsOptions = {
  origin: 'https://transist-booking.vercel.app',
  // origin: 'http://localhost:3000',
  methods: ['POST', 'GET', 'PUT', 'DELETE'],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/bookings', require('./routes/bookingRoutes'));
app.use('/api/users', require('./routes/userRoutes'));


app.get('/', (req, res) => res.send('Transit Api'));

app.use(errorHandler);

// No need to call db.connect(); anymore

app.listen(port, () => console.log(`Server started on port ${port}`));
