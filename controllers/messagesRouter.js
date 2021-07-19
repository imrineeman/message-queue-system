const messagesRouter = require('express').Router();
const messageService = require('../services/messageService')
const axios = require('axios')

messagesRouter.get('/',async (req,res)=>{
 const messages = await messageService.getMessages();
 return res.status(200).json(messages)
})

messagesRouter.get('/id/:id', async (req, res) => {
 const message = await messageService.getMessageById(req.params.id);
 res.status(200).json(message);
});

messagesRouter.get('/queue',async (req,res) => {
 const message = await messageService.getLatestJob()
 res.status(200).json(message)
})

messagesRouter.post('/', async (req,res) => {
 try {
  const result = await messageService.saveMessage(req.body)
  axios.get('http://localhost:3004/queue')
  res.status(201).json(result)
 } catch(err){
  res.status(400).json({error:err.name})
 }
})

module.exports = messagesRouter;
