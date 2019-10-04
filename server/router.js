const express = require('express')
const data = require('./data.json')

const { seller, goods, ratings } = data
const router = express.Router()

router.get('/seller', (req, res, next) => {
  res.json({
    code: 0,
    data: seller
  })
})

router.get('/goods', (req, res, next) => {
  res.json({
    code: 0,
    data: goods
  })
})

router.get('/ratings', (req, res, next) => {
  res.json({
    code: 0,
    data: ratings
  })
})

module.exports = router
