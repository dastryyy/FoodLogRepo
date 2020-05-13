//for user login/registration
const express = require('express');
const router = express.Router();

//User model
const User = require('../models/User');

//Login page
router.get('/login', (req,res) => res.send('Login'));

//Registration page
router.get('/register', (req,res) => res.send('Register'));

//Register handle
router.post('/register', (req, res) => {
    console.log(req.body)
    res.send(req.body)
    // //res.send(req.body)
    // const { name, email, password, password2 } = req.body;
    // let errors = [];

    // //Check required fields
    // if(!name || !email || !password || !password2) {
    //     errors.push({ msg: 'Please fill in all fields'});
    // }

    // //Check password length
    // if(password.length < 6) {
    //     errors.push({ msg: 'Password should be at least 6 characters'});
    // }

    // //Check if email is used

    // if(errors.length > 0) {
    //     res.send(errors)
    // } else {
    //     var data = {
    //         name: req.body.name,
    //         email: req.body.email,
    //         password: req.body.password,
    //         password2: req.body.password2
    //     }
    //     res.send(data)
    // }
 
})

module.exports = router;