const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');

//User Model
 
const user = require('../../models/user');

// @route Get api/user
// @ descr create get 
router.get('/', auth, (req, res) => {
    user.find()
    .then(user => res.json(user));
})
 
// @route Post api/user
// @ descr register user post  
router.post('/register', (req, res) => {
    const {name, email, password} = req.body;
    
    // simple validation
    if(!name || !email || !password){
        return res.status(400).json({msg: 'Please Enter all fields'});
    }

    // check for existing user

    user.findOne({email})
    .then(user => {
        if(user) return res.status(400).json({msg: 'User already exists'});
    })

    const newUser = new user({
         name: name,
         email: email,
         password: password
     });

     // create salt & hash
     bcrypt.genSalt(10, (err, salt)=>{
         bcrypt.hash(newUser.password, salt, (err, hash)=>{
             if(err) throw err;
                newUser.password = hash;
                newUser.save()
                .then(user => {
                    
                    jwt.sign(
                        { id: user.id },
                        config.get('jwtSecret'),
                        { expiresIn: 3600 },
                        (err, token)=>{
                            if(err) throw err;
                            res.json({
                               token: token,
                                user: { 
                                    id: user.id,
                                    name: user.name,
                                    email: user.email
                                }
                            });
                        }
                    )

            });
         })  
     })
})


// @route Post api/user
// @ descr auth user post 
router.post('/auth', (req, res) => {
    const {email, password} = req.body;
    
    // simple validation
    if(!email || !password){ 
        return res.status(400).json({msg: 'Please Enter all fields'});
    }

    // check for existing user

    user.findOne({email})
    .then(user => {
        if(!user) return res.status(400).json({msg: 'User does not exists'});

        //validate password
        bcrypt.compare(password, user.password)
        .then(isMatch =>{
            if(!isMatch) return res.status(400).json({msg: 'Inavalid Credentials'});

            jwt.sign(
                { id: user.id },
                config.get('jwtSecret'),
                { expiresIn: 3600 },
                (err, token)=>{
                    if(err) throw err;
                    res.json({
                       token: token,
                        user: { 
                            id: user.id,
                            name: user.name,
                            email: user.email
                        }
                    });
                }
            )
        })
    })

}) 



module.exports = router;