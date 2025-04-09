const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// middleware
app.use(cors());
app.use(express.json());


// testing route
app.get('/', (req, res) => {
  res.json({
    message: 'Hello from the CoffeeHub backend!',
  });
});

// routes
const testRoute = require('./routes/test');
const databaseRoutes = require('./routes/database');
const placeRoute = require('./routes/place');

// use route
app.use('/api', testRoute);
app.use('/api/database', databaseRoutes);
app.use('/api/places', placeRoute);

// port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;