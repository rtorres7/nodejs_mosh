const express = require('express');
const Joi = require('joi');

const app = express();
app.use(express.json());

const genres = [
    { id: 1, genre: 'action' },
    { id: 2, genre: 'drama' },
    { id: 3, genre: 'romance' },
    { id: 4, genre: 'fantasy' },
    { id: 5, genre: 'comedy' },
];

// read all genres
app.get('/api/genres', (req, res) => {
    res.send(genres);
});

// create a genre
app.post('/api/genres', (req, res) => {
    const { error } = valdidateGenre(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const genre = {
        id: genres.length + 1,
        genre: req.body.genre
    }
    genres.push(genre);
    res.send(genre);
})

// update a genre
app.put('/api/genres/:id', (req, res) => {
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if(!genre) return res.status(404).send('The genre with the specified ID cannot be located');

    const { error } = valdidateGenre(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    genre.genre = req.body.genre;
    res.send(genre);
})

// read a genre
app.get('/api/genres/:id', (req, res) => {
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if(!genre) return res.status(404).send('The genre with the specified ID cannot be located');
    res.send(genre);    
})

// delete a genre
app.delete('/api/genres/:id', (req, res) => {
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if(!genre) return res.status(404).send('The genre with the specified ID cannot be located');

    const index = genres.indexOf(genre);
    genres.splice(index, 1);

    res.send(genre);
})

function valdidateGenre(genre) {
    const schema = {
        genre: Joi.string().min(3).required(),
    };
    return Joi.validate(genre, schema);
}

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));