const { db } = require('../index');

class Place {
    // get all places
    static async getAllPlaces() {
        return db('Coffee_Shop').select('*');
    }

    // get place by id
    static async getPlaceById(placeId) {
        return db('Coffee_Shop').where({ place_id: placeId }).first();
    }

    // add new place 
    static async addPlace(place) {
        // Check if the place already exists
        const existingPlace = await db('Coffee_Shop')
            .where({ place_url: place.place_url })
            .first();
        if (existingPlace) {
            return {
                placeData: existingPlace,
                error: new Error('Cf shop already exists'),
            };
        }
        const [newPlace] = await db('Coffee_Shop').insert(place).returning('*');
        return newPlace;
    }

    // update place
    static async updatePlace(placeId, place) {
        const [updatedPlace] = await db('Coffee_Shop')
            .where({ place_id: placeId })
            .update(place)
            .returning('*');
        return updatedPlace;
    } 
    
    // delete place
    static deletePlace(placeId) {
        const deletedPlace = db('Coffee_Shop')
            .where({ place_id: placeId })
            .del();
        return deletedPlace;
    }
}

module.exports = Place;