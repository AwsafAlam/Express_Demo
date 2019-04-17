const express = require('express');
const Joi = require('joi');

//Init express
const app = express();
app.use(express.json()); // Allows the body to parse json requests
// express.json() returns a peice of middleware


const courses = [
    {
        id: 1,
        name: "Awsaf",
        subject: "Physics"
    },
    {
        id: 2,
        name: "Other",
        subject: "Chemistry"
    },
    {
        id: 3,
        name: "Other Name",
        subject: "Math"
    }

];

app.get('/' , function(req, res){
    res.send('<h1>Hello World</h1>');
    // res.sendFile(path.join(__dirname, 'public','index.html'));
});

app.get('/api/courses', (req, res) => {
    res.send(courses);    
});

app.get('/api/courses/:id', (req, res) => {
    // res.send(req.params);
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course){ // 404 not Found
        res.status(404).send("Course was not found");
    }
    else{
        res.send(course);
    }
});


//http://localhost:5000/api/courses/2/phy
app.get('/api/courses/:id/:sub', (req, res) => {
    res.send(req.params);
});

// http://localhost:5000/api/courses/2/phy?sortBy=name
// app.get('/api/courses/:id/:sub', (req, res) => {
//     res.send(req.query); // Query params are stored as objects.
// });

app.post('/api/courses', (req,res) => {
    
    const schema = {
        name: Joi.string().min(3).required(),
        subject: Joi.string().min(4).optional()
    }
    const result = Joi.validate(req.body, schema)
    console.log(result);
    //validation
    // if(!req.body.name || req.body.name.length < 3){
    //     res.status(400).send('Name is required & minimum 3 characters');
    //     return;
    // }
    if(result.error){
        res.status(400).send(result.error); //Send full error msg -> 400 = Bad Request
        // res.status(400).send(result.error.details[0].message); //Simplified error msg [well formatted]

        return;
    }
    const course = {
        id: courses.length + 1,
        name: req.body.name,
        subject: req.body.subject
    }
    courses.push(course);
    res.send(courses);
});

app.put('/api/courses/:id', (req, res) => {
    //Look up a course
    //If not existing, return 404
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course){ // 404 not Found
        res.status(404).send("Course was not found");
    }
    else{
        //Validate
        // If invalid, return 400 - Bad request
        // const result = validateCourse(req.body);

        const { error } = validateCourse(req.body); // Object destructuring to get specific property

        console.log(result);
        if(error){
            res.status(400).send(error); //Send full error msg -> 400 = Bad Request
            return;
        }
        // Update course
        // Return the updated course
        course.name = req.body.name;
        course.subject = req.body.subject;

        res.send(course);
    }

});

function validateCourse(course){
    const schema = {
        name: Joi.string().min(3).required(),
        subject: Joi.string().min(4).optional()
    }
    return Joi.validate(course, schema);
}

app.delete('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course){ // 404 not Found
        res.status(404).send("Course was not found");
    }
    else{
        const idx = courses.indexOf(course);
        courses.splice(idx,1);
        res.send(courses);
       }
});

const PORT = process.env.PORT || 5000;
// Listen on a port
app.listen(PORT , () => console.log(`Server started on port ${PORT}`));