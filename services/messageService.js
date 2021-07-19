const Message = require('../models/message')
const config = require('../utils/config')


const getMessages = async () => {
 const messages = await Message.find({});
 return messages;
}

const getMessageById = async (id) => {
 const message = await Message.findOne({ _id: id });
 return message;
};

const saveMessage = async (message) => {

 const messageData = new Message({
  recepient: message.recepient,
  message: message.message,
  sender: message.sender,
  status:'Accepted',
 })
 
 messageData.save()
 return messageData
}

const getLatestJob = async () => {

 latestInQueue = await Message.findOne({status:'Accepted'})
 if (!latestInQueue) {
  return null
 }

 updatedMessage = {
  recepient: latestInQueue.recepient,
  message: latestInQueue.message,
  sender: latestInQueue.sender,
  status: config.badWords.includes(latestInQueue.message) ? 
  'Failed' : 'Sent',
  'expireAt': Date.now(),
 }

 updatedMessage = await Message.findOneAndUpdate({
  _id:latestInQueue._id
 },updatedMessage,{new:true})

 return updatedMessage
}

module.exports = {
 saveMessage,
 getMessages,
 getMessageById,
 getLatestJob,
}