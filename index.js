//index.js

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const UserModel = require('./Models/User')
const bcrypt = require('bcrypt')

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://127.0.0.1:27017/ARFurnitue')



app.get('/users', (req, res) =>{
    UserModel.find()
    .then(result => res.json(result))
    .catch(err => res.json(err))
})

app.post('/user/signUp', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if the username already exists
        const existingUser = await UserModel.findOne({ userName: name });
        if (existingUser) {
            return res.status(400).json({ error: 'Username is already taken' });
        }

        // Check if the email already exists
        const existingEmail = await UserModel.findOne({ userEmail: email });
        if (existingEmail) {
            return res.status(400).json({ error: 'Email is already taken' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the new user
        const newUser = await UserModel.create({
            userName: name,
            userEmail: email,
            password: hashedPassword
        });

        // Send the created user as a response
        return res.status(201).json(newUser);
    } catch (err) {
        console.error('Error during sign-up:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.post('/users/login', async (req, res) => {

    const user = await UserModel.findOne({ userName: req.body.name })
    

    
    if(user == null){
        return res.status(400).send('Cannot find user')
    }

    try{
        if(await bcrypt.compare(req.body.password, user.password)){
            res.send('success')
            console.log('succes')
        }else {
            res.send('Not Allowed')
            console.log('faild you cant log')
        }
    }
    catch {
        res.status(500).send()
    }
        
    
})

// app.get('/get', (req, res) => {
//     TodoModel.find()
//     .then(result => res.json(result))
//     .catch(err => res.json(err))
// })

// app.put('/update/:id', (req, res) => {
//     const {id} = req.params;
//     TodoModel.findByIdAndUpdate({_id: id}, {done:true})
//     .then(result => res.json(result))
//     .catch(err => res.json(err))
    
// })

// app.put('/delete/:id', (req, res) => {
//     const {id} = req.params;
//     TodoModel.findByIdAndDelete({_id: id}, {done:true})
//     .then(result => res.json(result))
//     .catch(err => res.json(err))
    
// })

// app.post('/add', (req, res) => { 
//     const task = req.body.task;
//     TodoModel.create({
//         task: task
//     }).then(result => res.json(result)).catch(err => res.json(err))
// })

app.listen(3001, () => {
    console.log("Server is Running")
})
