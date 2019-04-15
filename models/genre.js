const mongoose = require('mongoose');
const Joi = require('joi');

const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 40
    }
});

const genreModel = mongoose.model('Genre', genreSchema);

const validateGenre = (genre) => {
    let schema = {
        name: Joi.string().min(5).max(20).required()
    };

    return Joi.validate(genre, schema);
};

module.exports = {
    Genre: genreModel,
    Validate: validateGenre
};