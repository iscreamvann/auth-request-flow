const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();

const mockUser = {
    username: 'authguy',
    password: 'mypassword',
    profile: {
        firstName: 'Chris',
        lastName: 'Wolstenholme',
        age: 43
    }
};

router.post('/login', (req, res) => {
    const {username, password} = req.body
    if(username === mockUser.username && password === mockUser.password){
        const token = jwt.sign({username: mockUser.username}, process.env.JWT_SECRET);
        res.status(200).json({ jwt: token})
    }
    else{
        res.status(400).json({error: "invalid username and password"})
    }
});

router.get('/profile', (req, res) => {
    jwt.verify(req.headers.authorization, process.env.JWT_SECRET, (error, decoded) => {
        console.log("decoded", decoded, error)
        if(error == null){
            res.status(200).json(mockUser.profile)
        }
        else{
            res.json(400).json({error: "Token invalid"})
        }
    })
});


module.exports = router;
