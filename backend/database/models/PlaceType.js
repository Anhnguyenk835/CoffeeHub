const { db } = require('../index');

class PlaceType {
    // get all place types
    static async getAllPlaceTypes() {
        return db('PlaceType').select('*');
    }

    // get place type by id
    static async getPlaceTypeById(placeTypeId) {
        return db('PlaceType').where({ place_type_id: placeTypeId }).first();
    }

    // add new place type 
    static async addPlaceType(placeType) {
        const [newPlaceType] = await db('PlaceType').insert(placeType).returning('*');
        return newPlaceType;
    }

    // update place type
    static async updatePlaceType(placeTypeId, placeType) {
        const [updatedPlaceType] = await db('PlaceType')
            .where({ place_type_id: placeTypeId })
            .update(placeType)
            .returning('*');
        return updatedPlaceType;
    } 
    
    // delete place type
    static deletePlaceType(placeTypeId) {
        const deletedPlaceType = db('PlaceType')
            .where({ place_type_id: placeTypeId })
            .del();
        return deletedPlaceType;
    }
}

module.exports = PlaceType;