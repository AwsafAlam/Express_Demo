const express = require('express');
const Joi = require('joi');
const logger = require('./middleware/logger');
const courses = require('./Data');

//Init express
const app = express();
app.use(express.json()); // Allows the body to parse json requests || express.json() returns a peice of middleware
app.use(express.urlencoded({extended: false}));

//Init Middleware
app.use(logger);


app.get('/' , function(req, res){
    res.send('<h1>Hello World</h1>');
});



const PORT = process.env.PORT || 5000;
// Listen on a port
app.listen(PORT , () => console.log(`Server started on port ${PORT}`));