// Module imports
const express = require('express');
const morgan = require('morgan');
const messagesRouter = require('./controllers/messagesRouter');
const mongoose = require('mongoose')
const config = require('./utils/config')

const app = express()
app.use(express.json())
app.use(morgan('tiny'));

mongoose.connect(config.MONGO_URI, {
 useNewUrlParser: true,
 useUnifiedTopology: true,
 useFindAndModify: false,
 useCreateIndex: true,
});

app.use('/messages',messagesRouter)

app.get('/', (req, res) => {
 res.status(200).send('<h1>SMS application</h1>');
});

module.exports = app;
