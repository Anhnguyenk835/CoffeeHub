const { db } = require('../index');

class Rating {
    // get all ratings
    static async getAllRatings() {
        return db('Coffee_Rating').select('*');
    }

    // get rating by id
    static async getRatingById(ratingId) {
        return db('Coffee_Rating').where({ rating_id: ratingId }).first();
    }

    // get ratings by place id
    static async getRatingsByPlaceId(placeId) {
        return db('Coffee_Rating').where({ place_id: placeId });
    }

    // add new rating
    static async addRating(rating) {
        const [newRating] = await db('Coffee_Rating').insert(rating).returning('*');
        return newRating;
    }

    // update rating
    static async updateRating(ratingId, rating) {
        const [updatedRating] = await db('Coffee_Rating')
            .where({ rating_id: ratingId })
            .update(rating)
            .returning('*');
        return updatedRating;
    }

    // delete rating
    static deleteRating(ratingId) {
        return db('Coffee_Rating')
            .where({ rating_id: ratingId })
            .del();
    }
}

module.exports = Rating; 