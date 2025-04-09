const supabase = require('../config/supabase');

// Operations for the places table
const placeModel = {
    // create a new place value (new row)
    async insert(placeData) {
        try {
            const { data, err } = await supabase
                .from('places')
                .insert([placeData])
                .select();

            if (err) throw err;
            return data[0]
        }
        catch (err) {
            console.error('Error inserting new value for place:', err);
            throw err;
        }       
    },

    // get a place by place_id
    async getPlaceById(placeId) {
        try {
            const { data, err } = await supabase
                .from('places')
                .select('*')
                .eq('place_id', placeId)
                .single();
            
            if (err) {
                if (err.code === 'PGRST116') {
                    // Handle the case where the place was not found
                    console.error('Place not found:', err);
                    return null;
                }
                console.error('Error fetching place by ID:', err);
                throw err;
            }
            return data;
        }
        catch (err) {
            console.error('Error fetching place by ID:', err);
            throw err;
        }
    },

    async getAllPlace() {
        try {
            const { data, err } = await supabase
                .from('places')
                .select('*');
            
            if (err) throw err;
            return data;
        }
        catch (err) {
            console.error('Error fetching all places:', err);
            throw err;
        }
    }   
};


module.exports = { placeModel };