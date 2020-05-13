//for user login/registration
const express = require('express');
const router = express.Router();

//Login page
router.get('/login', (req,res) => res.send('Login'));

//Registration page
router.get('/register', (req,res) => res.send('Register'));

//Register handle
router.post('/register', (req, res) => {
    //res.send(req.body)
    const { name, email, password, password2 } = req.body;
    let errors = [];

    //Check required fields
    if(!name || !email || !password || !password2) {
        errors.push({ msg: 'Please fill in all fields'});
    }

    //Check password length
    if(password.length < 6) {
        errors.push({ msg: 'Password should be at least 6 characters'});
    }

    //Check if email is used

    if(errors.length > 0) {
        res.send(errors)
    } else {
        res.send(req.body);
    }
 
})

module.exports = router;