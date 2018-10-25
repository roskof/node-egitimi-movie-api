const express = require('express');
const bcrypt=require('bcryptjs')
const router = express.Router();

// Models
const User=require('../models/User')

router.get('/', (req, res, next)=> {
  res.render('index', { title: 'Express' });
});

router.post('/register', (req, res, next)=> {
  const {username, password}=req.body

  bcrypt.hash(password, 8, function(err, hash) {
    if(err)
      console.log(err)
    const user= new User({
    username,
    password:hash
  })

  const promise =user.save()

  promise.then((data)=>{
    res.json(data)
  }).catch((err)=>{
    res.json(err)
  })
  });
  
});

module.exports = router;
