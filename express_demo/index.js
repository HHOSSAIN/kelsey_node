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

app.post("/api/courses", (req, res) =>{
    const schema = {
        name: Joi.string().min(3).required()
    }

    const result = Joi.validate(req.body, schema);
    if(result.error){
        res.status(400).send(result.error.details[0].message); //[0] dewate just 1st error ta dekhabe, we may also choose to print all the error messages as well
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

port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));