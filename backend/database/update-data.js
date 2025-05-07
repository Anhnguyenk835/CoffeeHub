const axios = require('axios');

const BASE_URL = 'http://localhost:3000/api';

async function addData() {
    try {
        // add a place
        const placeData = {
            place_url: 'https://example.com',
            place_name: 'Example Coffee Shop',
            price_range: '$$',
            phone: '123-456-7890',
            website: 'https://example.com',
            latitude: 40.7128,
            longitude: -74.0060,
        }
        console.log('Adding place data...');
        const placeResponse = await axios.post(`${BASE_URL}/places`, placeData);
        const place = placeResponse.data;
        console.log('Place added:', place);

        // add a place type
        const placeTypeData = [
            { place_id: place.place_id, type_name: 'Coffee Shop' },
            { place_id: place.place_id, type_name: 'Bakery & Coffee' },
        ];
        console.log('Adding place type data...');
        for (const type of placeTypeData) {
            const placeTypeResponse = await axios.post(`${BASE_URL}/place-types`, type);
            console.log('Place type added:', placeTypeResponse.data);
        }
    }
    catch (error) {
        if (error.response && error.response.status === 400) {
            console.error('Error: Duplicate entry detected:', error.response.data.message);
        } else {
            console.error('Error adding data:', error.response?.data || error.message);
        }
    }
}

if (require.main === module) {
    addData()
        .then(() => process.exit(0))
        .catch((error) => {
            console.error('Error in addData:', error);
            process.exit(1);
        });
}

module.exports = { addData };