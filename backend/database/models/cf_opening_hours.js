const { db } = require('../index');

class OpeningHours {
    // get all opening hours
    static async getAllOpeningHours() {
        return db('Coffee_Opening_Hours').select('*');
    }

    // get opening hours by id
    static async getOpeningHoursById(openingHoursId) {
        return db('Coffee_Opening_Hours').where({ opening_hours_id: openingHoursId }).first();
    }

    // get opening hours by place id
    static async getOpeningHoursByPlaceId(placeId) {
        return db('Coffee_Opening_Hours').where({ place_id: placeId });
    }

    // add new opening hours
    static async addOpeningHours(openingHours) {
        const [newOpeningHours] = await db('Coffee_Opening_Hours').insert(openingHours).returning('*');
        return newOpeningHours;
    }

    // update opening hours
    static async updateOpeningHours(openingHoursId, openingHours) {
        const [updatedOpeningHours] = await db('Coffee_Opening_Hours')
            .where({ opening_hours_id: openingHoursId })
            .update(openingHours)
            .returning('*');
        return updatedOpeningHours;
    }

    // delete opening hours
    static deleteOpeningHours(openingHoursId) {
        return db('Coffee_Opening_Hours')
            .where({ opening_hours_id: openingHoursId })
            .del();
    }
}

module.exports = OpeningHours; 