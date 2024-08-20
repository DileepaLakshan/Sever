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

    const existingUser = await UserModel.findOne({userName: req.body.name });
    const existingEmail = await UserModel.findOne({userEmail: req.body.email });
    if (existingUser) {
        console.log('Username is already taken');
        return res.status(400).send({ error: 'Username is already taken' });
      }

    if(existingEmail) {
        return res.status(400).send({ error: 'email is already taken' });
      }
      


    console.log(req.body.name);
    console.log(req.body.password);
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const name = req.body.name;
    const email = req.body.email;
    const Password = hashedPassword;

    UserModel.create({
        userName: name,
        userEmail: email,
        password: Password
    }).then(result => res.json(result)).catch(err => res.json(err))
    
})

app.post('/user/login', async (req, res) => {

    // Ensure the correct field name is being used here
    const user = await UserModel.findOne({ userName: req.body.name });


    if (user == null) {
        return res.status(400).send('Cannot find user');
    }

    try {

        // bcrypt.compare(req.body.password,user.password, function(err, result) {
        //     // result == true
        // });
        if (await bcrypt.compare(req.body.password,user.password, function(err, result) {
            
            console.log(result)
            if(result==true){
                res.status(200).send("sucusess");
            }
            else{
                res.status(400).send("Invalid password");
            }
        }));
    
    // ) {
    //         res.status(200).send('success');
    //         console.log('success1');
    //     } else {
    //         res.status(403).send('Not Allowed');
    //         console.log('Failed: You cannot log in');
    //         console.log(req.body.password);
    //         console.log(user.password);
    //     }
    } catch (error) {
        console.error(error); // Log the error for debugging purposes
        res.status(500).send('Server error');
    }
});


app.listen(3001, () => {
    console.log("Server is Running")
})
