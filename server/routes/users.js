// for user login/registration
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const passport = require('passport');
const jwt = require('jsonwebtoken');
const keys = require('../config/config');

// User model
const User = require('../models/User');

// Login page
router.get('/login', (req,res) => res.send('Login'));

// Login handle
router.post('/login', (req, res) => {
    const { email, password } = req.body;
    let errors = [];
    // find user by email
    if(errors.length > 0) {
        res.status(400).send(errors.join(', '))
        return;
    }
    User.findOne({email: email}).then(user => {
        if(!user) {
            errors.push('Email not found')
            res.status(400).send(errors.join(', '))            
        }
        else {
            // check password
            bcrypt.compare(password,user.password).then(isMatch => {
                if(isMatch) {
                    // user matched
                    // create JWT payload
                    const payload = {
                        id: user._id,
                        email: user.email
                    };

                    // sign token
                    jwt.sign(
                        payload,
                        keys.db.secretOrKey,
                        {
                            expiresIn: 31556926 // 1 year in seconds
                        },
                        (err, token) => {
                            res.send({
                                success: true,
                                token: 'Bearer ' + token
                            });
                        }
                    );                    
                } else {
                    errors.push('Password incorrect')
                    return res
                      .status(400)
                      .send(errors.join(', '))
                }
            })

        }

    })
})

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

    // Check if email is in the correct format
    var re = /\S+@\S+\.\S+/;
    if(!re.test(String(email).toLowerCase())) {
        errors.push('Email is not valid')
    }    

    if(errors.length > 0) {
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