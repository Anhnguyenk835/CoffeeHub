const { db } = require('../index');

class Place {
    // get all places
    static async getAllPlaces() {
        return db('Place').select('*');
    }

    // get place by id
    static async getPlaceById(placeId) {
        return db('Place').where({ place_id: placeId }).first();
    }

    // add new place 
    static async addPlace(place) {
        // Check if the place already exists
        const existingPlace = await db('Place')
            .where({ place_url: place.place_url })
            .first();
        if (existingPlace) {
            return {
                placeData: existingPlace,
                error: new Error('Place already exists'),
            };
        }
        const [newPlace] = await db('Place').insert(place).returning('*');
        return newPlace;
    }

    // update place
    static async updatePlace(placeId, place) {
        const [updatedPlace] = await db('Place')
            .where({ place_id: placeId })
            .update(place)
            .returning('*');
        return updatedPlace;
    } 
    
    // delete place
    static deletePlace(placeId) {
        const deletedPlace = db('Place')
            .where({ place_id: placeId })
            .del();
        return deletedPlace;
    }
}

module.exports = Place;