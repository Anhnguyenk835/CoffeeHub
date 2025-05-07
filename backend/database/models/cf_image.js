const { db } = require('../index');

class Image {
    // get all images
    static async getAllImages() {
        return db('Coffee_Image').select('*');
    }

    // get image by id
    static async getImageById(imageId) {
        return db('Coffee_Image').where({ image_id: imageId }).first();
    }

    // get images by place id
    static async getImagesByPlaceId(placeId) {
        return db('Coffee_Image').where({ place_id: placeId });
    }

    // add new image
    static async addImage(image) {
        const [newImage] = await db('Coffee_Image').insert(image).returning('*');
        return newImage;
    }

    // update image
    static async updateImage(imageId, image) {
        const [updatedImage] = await db('Coffee_Image')
            .where({ image_id: imageId })
            .update(image)
            .returning('*');
        return updatedImage;
    }

    // delete image
    static deleteImage(imageId) {
        return db('Coffee_Image')
            .where({ image_id: imageId })
            .del();
    }
}

module.exports = Image; 