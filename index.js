const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const Chat = require('./modules/Chat.js');
const methodOverride = require('method-override');
app.use(methodOverride('_method'));
;
main().then(()=>console.log("connection succesful"))
.catch(err => console.log(err));
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}
app.use(express.urlencoded({extended : true}));
app.use(express.json());
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
app.get('/add',(req,res)=>{
    res.render('add');
})
app.post('/add',async(req,res)=>{
    let obj = req.body;
    obj.date = new Date();
    await Chat.create(obj);
    res.redirect('/chats');
})
app.delete('/delete/:id',async(req,res)=>{
    let {id} = req.params;
    await Chat.deleteOne({_id : id});
    res.redirect('/chats')
})
app.get('/edit/:id',async(req,res)=>{
    let {id} = req.params;
    let data = await Chat.find({_id : id});
    console.log(data);
    res.render('edit',{obj:data[0]});
})
app.patch('/chats',async(req,res)=>{
    let obj = req.body;
    obj.date = new Date();
    await Chat.replaceOne({_id:obj.id},obj);
    res.redirect('/chats');
})