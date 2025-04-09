const supabase = require ('../config/supabase');

const placeTypeModel = {

    // add new row for place_type
    async insert(typeData) {
        try {
            const { data, error } = await supabase
                .from('place_types')
                .insert([typeData])
                .select();

            if (error) throw error;
            return data[0];
        } catch (error) {
            console.error('Error inserting new place type:', error);
            throw error;
        }
    },

    async insertMany(typesArray) {
        try {
            const { data, error } = await supabase
                .from('place_types')
                .insert(typesArray)
                .select();
            if (error) throw error;
            return data;
        }
        catch (error) {
            console.error('Error inserting multiple place types:', error);
            throw error;
        }
    }
}


module.exports = { placeTypeModel };