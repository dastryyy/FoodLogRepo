//for user login/registration
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')

// User model
const User = require('../models/User');

// Login page
router.get('/login', (req,res) => res.send('Login'));

// Registration page
router.get('/register', (req,res) => res.send('Register'));

// Register handle
router.post('/register', (req, res) => {
    //res.send(req.body)
    const { name, email, password, password2 } = req.body;
    let errors = [];

    // Check required fields
    if(!name || !email || !password || !password2) {
        errors.push('Please fill in all fields');
    }

    // Check password length
    if(password.length < 6) {
        errors.push('Password should be at least 6 characters');
    }

    // Check if password confirmation is valid
    if(password.localeCompare(password2) != 0) {
        errors.push('Passwords do not match')
    }


    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    //return re.test(String(email).toLowerCase());
    if(!re.test(String(email).toLowerCase())) {
        errors.push('Email is not valid')
    }
    

    if(errors.length > 0) {
       // res.status(400).json({'error': errors.join(', ')});
        res.status(400).send(errors.join(', '))
        return;
    } else {
        // Check if email is used
        User.findOne({ email: email })
            .then(user => {
                if(user) {
                    // user exists
                    errors.push('Email is already registered');
                    res.status(400).send(errors.join(', '))
                }
                else {
                    const newUser = new User({
                        name,
                        email,
                        password
                    });
                   
                    // Hash Password
                    bcrypt.genSalt(10, (err, salt) => 
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if(err) throw err;
                            // set password to hashed
                            newUser.password = hash;
                            // save user
                            newUser.save()
                                .then(user => {
                                    res.send('Successful registration')
                                })
                                .catch(err =>console.log(err));

                        }))
                }
            });            

    } 
 
})

module.exports = router;