const { db } = require('../index');

class Extension {
    // get all extensions
    static async getAllExtensions() {
        return db('Coffee_Extension').select('*');
    }

    // get extension by id
    static async getExtensionById(extId) {
        return db('Coffee_Extension').where({ ext_id: extId }).first();
    }

    // get extensions by place id
    static async getExtensionsByPlaceId(placeId) {
        return db('Coffee_Extension').where({ place_id: placeId });
    }

    // add new extension
    static async addExtension(extension) {
        const [newExtension] = await db('Coffee_Extension').insert(extension).returning('*');
        return newExtension;
    }

    // update extension
    static async updateExtension(extId, extension) {
        const [updatedExtension] = await db('Coffee_Extension')
            .where({ ext_id: extId })
            .update(extension)
            .returning('*');
        return updatedExtension;
    }

    // delete extension
    static deleteExtension(extId) {
        return db('Coffee_Extension')
            .where({ ext_id: extId })
            .del();
    }
}

module.exports = Extension; 