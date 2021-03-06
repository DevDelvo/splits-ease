const router = require('express').Router()
const { User, Friend } = require('../db')
const {paypal} = require('./paypal')

module.exports = router

router.post('/', async (req, res, next) => {
  try {
    const user = await User.findOrCreate({
      where: {
        email: req.body.email
      },
      defaults: req.body
   })
    if (user[1]) {
      res.json(user[0])
    } else {
      const err = new Error('User already exists!')
      err.status = 401
      next(err)
    }
  } catch (err) {
    next(err)
  }
})

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll()
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.put('/login', async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email,
        password: req.body.password,
      },
    })
    if (user) {
      res.send(user)
    } else {
      const err = new Error('Wrong email and/or password')
      err.status = 401
      next(err)
    }
  } catch (err) {
    next(err)
  }
})

router.get('/:id/friends', async (req, res, next) => {
  try {
    const friends = await Friend.findAll({ where: { userId: req.params.id } })
    res.json(friends)
  } catch (err) {
    next(err)
  }
})

router.post('/:id/friends', async (req, res, next) => {
  try {
    const friend = await Friend.findOrCreate({
      where: {
        name: req.body.name,
        userId: req.params.id
      },
      defaults: req.body
    })
    if (friend[1]) {
      res.json(friend[0])
    } else {
      const err = new Error('Friend already exists!')
      err.status = 401
      next(err)
    }
  } catch (err) {
    next(err)
  }
})

router.get('/:id/friends', async (req, res, next) => {
  try {
    const friends = await Friend.findAll({ where: { userId: req.params.id } })
    res.json(friends)
  } catch (err) {
    next(err)
  }
})

router.delete('/:id/friends/:friendId', async (req, res, next) => {
  try {
    await Friend.destroy({
      where: {
        id: req.params.friendId
      }
    })
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
})

router.put('/:id/friends', async (req, res, next) => {
  try {
    const friend = await Friend.update(
      req.body,
      { where: {
        id: req.body.id
      },
      returning: true
    })
    res.json(friend[1])
  } catch(err) {
    console.log(err)
  }
})

router.get('/authorizePaypal', (req, res, next) => {
  try {
      const url = paypal.openid_connect.authorizeUrl({scope: 'openid https://uri.paypal.com/services/invoicing email'})
      res.json(url)
  } catch (err) {
      next(err)
  }
})