const express = require('express');
const { getAllPlace, getPlaceById } = require('../controllers/place-controller');
const supabase = require('../config/supabase');
const router = express.Router();


// Route to get all places
router.get('/', async (req, res) => {
    try {
        const places = await getAllPlace();
        return res.json({ 
            success: true, 
            data: places 
        });
    }
    catch {
        console.error('Error fetching all places in place route:', error);
        return res.status(500).json({ 
            success: false, 
            message: 'Error fetching all places in place route', 
            error: error.message 
        });
    }
});

// Route to get a place by ID
router.get('/place-id/:placeId', async (req, res) => {
    const { placeId } = req.params;
    try {
        const place = await getPlaceById(placeId);
        if (!place) {
            return res.status(404).json({ 
                success: false, 
                message: 'Place not found' 
            });
        }
        return res.json({ 
            success: true, 
            data: place 
        });
    }
    catch (error) {
        console.error('Error fetching place by ID in place route:', error);
        return res.status(500).json({ 
            success: false, 
            message: 'Error fetching place by ID in place route', 
            error: error.message 
        });
    }
});


router.get('/with-types/:placeId', async (req, res) => {
    const { placeId } = req.params;
    try {
        // First get the place
        const { data: place, error: placeError } = await supabase
            .from('places')
            .select('*')
            .eq('place_id', placeId)
            .single();
            
        if (placeError || !place) {
            return res.status(404).json({ 
                success: false, 
                message: 'Place not found' 
            });
        }
        
        // Then get the place types
        const { data: placeTypes, error: typesError } = await supabase
            .from('place_types')
            .select('place_type_id, type_name')
            .eq('place_id', placeId);
            
        if (typesError) {
            console.error('Error fetching place types:', typesError);
            return res.status(500).json({ 
                success: false, 
                message: 'Error fetching place types', 
                error: typesError.message 
            });
        }
        
        // Combine and return the data
        return res.json({ 
            success: true, 
            data: {
                ...place,
                types: placeTypes || []
            }
        });
    }
    catch (error) {
        console.error('Error fetching place with types:', error);
        return res.status(500).json({ 
            success: false, 
            message: 'Error fetching place with types', 
            error: error.message 
        });
    }
});

module.exports = router;