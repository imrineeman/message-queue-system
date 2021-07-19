const express = require('express')
const morgan = require('morgan');
const messageService = require('./services/messageService')
const mongoose = require('mongoose')
const config = require('./utils/config')
const cron = require('node-cron')
const app = express()

app.use(morgan('tiny'));

mongoose.connect(config.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const forwardMessage = async () => {
  let bool = true
  while (bool){
    const response = await messageService.getLatestJob()
        if (response && response.status !=='Failed') {
          console.log('Forwarding message for 3rd party!')
          setTimeout(()=>{console.log('finished')},200)
      } else {
        flag = false
        console.log('Message not forwarded!')
        return
      }
  }
}

app.get('/', (req, res) => {
  console.log('Hi!')
  res.send('<h1>Hello World!</h1>')
})

app.get('/queue', async (req,res) => {
  await forwardMessage()
  return res.status(200).json({'status':'Message queue is empty'})
})

app.listen(config.LIMITER_PORT, () => {
  console.log(`Limiter running on port ${config.LIMITER_PORT}`)
})

