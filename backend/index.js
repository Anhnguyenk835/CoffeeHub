require('dotenv').config({ path: '/.env' });

const express = require('express');
const cors = require('cors');

// import routes
const placeRoute = require('./routes/cfShopRoute');
const extensionRoute = require('./routes/cfExtensionRoute');
const imageRoute = require('./routes/cfImageRoute');
const ratingRoute = require('./routes/cfRatingRoute');
const openingHoursRoute = require('./routes/cfOpeningHoursRoute');

// init app
const app = express();
const PORT = process.env.PORT || 3000;

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use('/api/places', placeRoute);
app.use('/api/extensions', extensionRoute);
app.use('/api/images', imageRoute);
app.use('/api/ratings', ratingRoute);
app.use('/api/opening-hours', openingHoursRoute);

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