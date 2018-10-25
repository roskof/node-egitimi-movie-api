const express = require('express');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const router = express.Router();

// Models
const User = require('../models/User')

router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

router.post('/register', (req, res, next) => {
  const { username, password } = req.body

  bcrypt.hash(password, 8, function (err, hash) {
    if (err)
      console.log(err)
    const user = new User({
      username,
      password: hash
    })

    const promise = user.save()

    promise.then((data) => {
      res.json(data)
    }).catch((err) => {
      res.json(err)
    })
  });

});

router.post('/authenticate', (req, res, next) => {
  const { username, password } = req.body
  User.findOne({
    username
  }, (err, user) => {
    if (err)
      throw err

    if (!user) {
      /* res.json({
         status: false,
         message: 'Authentication failed, user not found.'
       })*/
      next({ status: false, message: 'Authentication failed, user not found.', code: 999 })
    } else {
      bcrypt.compare(password, user.password, (err, result) => {
        if (err)
          throw err
        if (!result) {
          next({ status: false, message: 'Authentication failed, wrong password', code: 109 })
        } else {
          const payload = {
            username
          }

          const token = jwt.sign(payload, req.app.get('api_secret_key'), {
            expiresIn: 720
          })

          res.json({
            status: true,
            token
          })
        }
      })
    }
  })
})

module.exports = router;
