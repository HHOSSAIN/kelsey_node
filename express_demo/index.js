const Joi = require('joi');
const express = require("express");
const app = express();

app.use(express.json());

const courses = [
    {id:1, name:'course1'},
    {id:2, name:'course2'},
    {id:3, name:'course3'},
]

app.get("/", (req, res) => {
    res.send("hello world!!!");
})

app.get("/api/courses", (req, res) =>{
    res.send([1,2,3]);
})

//searching course
app.get("/api/courses/:id", (req, res) =>{
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course){
        res.status(404).send("The course with requested id could not be found");
    }
    res.send(course);
})

app.post("/api/courses", (req, res) =>{
    // const schema = {
    //     name: Joi.string().min(3).required()
    // }

    const {error} = validateCourse(req.body);
    //const result = Joi.validate(req.body, schema);
    if(error){
        res.status(400).send(error.details[0].message); //[0] dewate just 1st error ta dekhabe, we may also choose to print all the error messages as well
        return;
    }

    //if code gets to here, it means valid post req sent to add new course
    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
})

//updating course
app.put("/api/courses/:id", (req, res) =>{
    //search, if not found, return 404
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course){
        res.status(404).send("The course with requested id could not be found");
    }


    //valdiation check of update request
    // const schema = {
    //     name: Joi.string().min(3).required()
    // }

    //const result = Joi.validate(req.body, schema);
    const {error} = validateCourse(req.body);
    if(error){
        res.status(400).send(error.details[0].message); //[0] dewate just 1st error ta dekhabe, we may also choose to print all the error messages as well
        return;
    }

    //update course and return updated course
    course.name = req.body.name;
    res.send(course);
})

function validateCourse(course){
    const schema = {
        name: Joi.string().min(3).required()
    }

    return Joi.validate(course, schema)
}

port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));