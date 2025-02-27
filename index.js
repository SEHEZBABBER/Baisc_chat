const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const Chat = require('./modules/Chat.js');
main().then(()=>console.log("connection succesful"))
.catch(err => console.log(err));
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.listen(8080,()=>{
    console.log("listening through port 8080");
})
app.get('/',(req,res)=>{
    res.render('home');
})
app.get('/chats',async(req,res)=>{
    let data = await Chat.find();
    res.render('chats',{data});
})
