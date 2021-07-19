const express = require('express')
const morgan = require('morgan');
const messageService = require('./services/messageService')
const mongoose = require('mongoose')
const config = require('./utils/config')
const slowDown = require("express-slow-down");

const app = express()
app.use(morgan('tiny'));

mongoose.connect(config.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
 });

const speedLimiter = slowDown({
  windowMs:1000,
  delayAfter:10,
  delayMs:1000,
})

app.use(speedLimiter)
app.get('/', (req, res) => {
  console.log('Hi!')
  response.send('<h1>Hello World!</h1>')
})

app.get('/queue', async (req,res) => {
  const response = await messageService.getLatestJob()
  return res.status(200).json(response)
})

const PORT = 3004
app.listen(PORT, () => {
  console.log(`Limiter running on port ${PORT}`)
})

