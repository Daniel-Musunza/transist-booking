const path = require('path');
const express = require('express');
const colors = require('colors');
const cors = require('cors');
const dotenv = require('dotenv');
const { errorHandler } = require('./middleware/errorMiddleware');
const db = require('./config/db');
dotenv.config(); // Import your MySQL db connection setup
const port = process.env.PORT;
console.log('port',port);



const app = express();

// origin: 'http://localhost:3000',
const corsOptions = {
  
  origin: 'https://transist-booking.vercel.app',
  methods: ['POST', 'GET', 'PUT', 'DELETE'],
};

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/bookings', require('./routes/bookingRoutes'));
app.use('/api/users', require('./routes/userRoutes'));


app.get('/', (req, res) => res.send('Transit Api'));

app.use(errorHandler);

// No need to call db.connect(); anymore

app.listen(port, () => console.log(`Server started on port ${port}`));
