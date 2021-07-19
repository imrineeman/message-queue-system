const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
 'recepient':String,
 'message':String,
 'sender':String,
 'status':String,
 'expireAt': {
   type: Date,
   default:null
 }
},{timestamps:true});

messageSchema.set('toJSON', {
 transform: (document, returnedObject) => {
   returnedObject['transition_id'] = returnedObject._id
   delete returnedObject._id
   delete returnedObject.__v;
 },
});

messageSchema.index({expireAt: 1},{expireAfterSeconds: 3600});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;