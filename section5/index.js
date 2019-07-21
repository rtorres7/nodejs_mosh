const config = require('config');
const Joi = require('joi');
const helmet = require('helmet');
const morgan = require('morgan');
const logger = require('./logger');
const authenticate = require('./authenticate');
const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));  // served from root of site
app.use(helmet());

// configuration
console.log('app name: ' + config.get('name'));
console.log('mail server: ' + config.get('mail.host'));
console.log('mail password: ' + config.get('mail.password'));

if (app.get('env') === 'development') {
    app.use(morgan('common'));
    console.log('morgan enabled...');
}

app.use(logger);
app.use(authenticate);

const name = 'rudy';

const courses = [
    {id: 1, name: 'course 1'},
    {id: 2, name: 'course 2'},
    {id: 3, name: 'course 3'},
    {id: 4, name: 'course 4'},
];

app.get('/', (req, res) => {
    res.send(`Hello ${name}!!!`);
});

app.get('/api/courses', (req, res) => {
    res.send(courses);
});

app.post('/api/courses', (req, res) => {
    const { error } = validateCourse(req.body);
    if(error)
        return res.status(400).send(error.details[0].message);
    
    const course = {
        id: courses.length + 1,
        name: req.body.name
    }
    courses.push(course);
    res.send(course);
})

app.put('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('the course with the given ID was not found');
    
    const { error } = validateCourse(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    
    course.name = req.body.name;
    res.send(course);
})

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('the course with the given ID was not found');
    res.send(course);
});

app.delete('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('the course with the given ID was not found');

    const index = courses.indexOf(course);
    courses.splice(index, 1);
    
    res.send(course);
})

function validateCourse(course) {
    const schema = {
        name: Joi.string().min(3).required(),
    };
    return Joi.validate(course, schema);
}

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}...`));