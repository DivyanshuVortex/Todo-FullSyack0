const mongoose = require('mongoose');
async function db() {
   try {
  const dbreq = await mongoose.connect('mongodb+srv://divyanshuchandra9027:xPwF3DzywQmoeGiq@cluster0.hdmwfhe.mongodb.net/')  
  console.log('DB ✅✅✅')
} catch (error) {
    console.log('DB ❌❌❌')
} 
}
   
const todoSchema = mongoose.Schema({
    title : String,
    description : String,
    completed : Boolean
})
const Todo = mongoose.model('Todo', todoSchema)
module.exports = {
    db ,
    Todo
};