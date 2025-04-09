CREATE TABLE places (
    place_id SERIAL PRIMARY KEY,
    place_url TEXT NOT NULL,
    place_name TEXT NOT NULL,
    price_range TEXT,
    phone TEXT,
    website TEXT,
    latitude DECIMAL NOT NULL,
    longitude DECIMAL NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- CREATE INDEX idx_places_place_id ON places(place_id);