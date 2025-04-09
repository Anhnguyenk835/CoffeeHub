CREATE TABLE place_types
(
    place_type_id SERIAL PRIMARY KEY,
    place_id INTEGER REFERENCES places(place_id) ON DELETE CASCADE,
    type_name TEXT NOT NULL
);

CREATE INDEX idx_place_types_place_id ON place_types(place_id);