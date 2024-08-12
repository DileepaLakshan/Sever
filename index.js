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

app.post('/users', async (req, res) => {

    console.log(req.body.name);
    console.log(req.body.password);
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const name = req.body.name;
    const Password = hashedPassword;

    UserModel.create({
        userName: name,
        password: Password
    }).then(result => res.json(result)).catch(err => res.json(err))
    
})

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
