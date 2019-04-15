const express = require('express');
const { Genre, Validate } = require('../models/genre');

const router = express.Router();

router.get('/', async (req, res) => {
    const genres = await Genre.find().sort('name');
    res.json(genres);
});

router.get('/:id', async (req, res) => {
    const genre = await Genre.findById(req.params.id);

    if (!genre) return res.status(404).json({ error: 'The genre with the given ID was not found' });

    res.json(genre);
});

router.post('/', async (req, res) => {
    const { error } = Validate(req.body);

    if (error) return res.status(400).json({ error: error.details[0].message });

    const genre = await Genre.create({ name: req.body.name });

    res.json(genre);
});

router.put('/:id', async (req, res) => {
    const { error } = Validate(req.body);

    if (error) return res.status(400).json({ error: error.details[0].message });
    
    const genre = await Genre.findByIdAndUpdate(req.params.id, 
        { name: req.body.name }, 
        { new: true }
    );

    if (!genre) return res.status(404).json({ error: 'The genre with the given ID was not found' });

    res.json(genre);
});

router.delete('/:id', async (req, res) => {
    const genre = await Genre.findByIdAndRemove(req.params.id);

    if (!genre) return res.status(404).json({ error: 'The genre with the given ID was not found' });

    res.json(genre);
});

module.exports = router;