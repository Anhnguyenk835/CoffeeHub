require('dotenv').config({ path: '/.env' });

const express = require('express');
const cors = require('cors');

// import routes
const placeRoute = require('./routes/cfShopRoute');

// init app
const app = express();
const PORT = process.env.PORT || 3000;

// middleware
app.use(cors());
app.use(express.json());

// apply routes
app.use('/api/places', placeRoute);

// root route
app.get('/', (req, res) => {
    res.json({
        message: 'Server is running',
    });
});

// start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;