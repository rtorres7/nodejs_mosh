const config = require('config');
const debug = require('debug')('app:startup');
const morgan = require('morgan');
const logger = require('../middleware/logger');
const authenticate = require('../middleware/authenticate');
const courses = require('../routes/courses');
const express = require('express');
const app = express();

console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
console.log(`app: ${app.get('env')}`);

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));  // must be served from root of site
app.use('/api/courses', courses);

// // configuration
// console.log('app name: ' + config.get('name'));
// console.log('mail server: ' + config.get('mail.host'));
// console.log('mail password: ' + config.get('mail.password'));

if (app.get('env') === 'development') {
    app.use(morgan('common'));
    console.log('morgan enabled...');
}

app.use(logger);
app.use(authenticate);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}...`));