const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const express = require('express');
const UserModel = require('./models/users'); 
const Student = require('./models/student');
const app = express();
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost:27017/placement").then(() => {
    console.log("Mongo DB connected");
});

app.listen(3000, () => {
    console.log("Server listening on port 3000");
});
/*
app.post('/users', async (req, res) => {
    console.log(req.body);
    console.log("Inside the user post request");
    try {
        const { username, password } = req.body;
        const user = await UserModel.create({
            username,
            password
        });
        console.log(user);
        res.status(201).json(user); 
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error creating user" });
    }
});

app.get('/users', async (req, res) => {
    try {
        const users = await UserModel.find();

        const additionalData = {
            totalUsers: users.length,
            greeting: "Welcome to the user list!"
        };

        // Combine the data from the database with additional information
        const response = {
            users: users,
            additionalData: additionalData
        };


        console.log(response);
        //console.log(users)
        res.status(201).json(users); // Responding with the created user
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error creating user" });
    }
});
*/
//






app.get('/students', async (req, res) => {
    try {
        const students = await Student.find(); // Fetch all students
        console.log(students);
        res.status(200).json(students); // Respond with all students
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error fetching students" });
    }
    
    
});
app.post('/students', async (req, res) => {
    console.log('Entered')
    try {
        const { name, rollnumber, course, year } = req.body;

        // Validate rollnumber is not null or undefined
        if (!rollnumber) {
            return res.status(400).json({ message: "rollNumber is required" });
        }

        // Check if student with same rollNumber already exists
        const existingStudent = await Student.findOne({ rollnumber });

        if (existingStudent) {
            return res.status(400).json({ message: "Student with this rollNumber already exists" });
        }

        // Create and save the new student
        const newStudent = await Student.create({ name, rollnumber, course, year });

        console.log(newStudent);
        res.status(201).json(newStudent); // Respond with the created student
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error creating student" });
    }
});
