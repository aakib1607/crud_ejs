const express =require('express')
const app =express();
const path = require('path');
const user=require('./model/user');
const { create } = require('domain');

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')));
app.set('view engine', 'ejs')

app.get("/", (req,res)=>{
    res.render("index")
})
app.post("/create",async (req,res)=>{
    let {name,email,imageUrl}=req.body;
    let createUser=await user.create({
        name,
        email,
        imageUrl
    })
    // res.send(createUser);
    res.redirect('/read')
})
app.get("/read",async (req,res)=>{
   let getUser=await user.find();
   res.render("userget",{getUser})
})
app.get("/edit/:userid",async (req,res)=>{
   let editUser=await user.findOne({_id:req.params.userid});
   res.render("edit",{editUser})
})
app.post("/update/:userid",async (req,res)=>{
    let {email,name,imageUrl}=req.body;
   let updateUser=await user.findOneAndUpdate({_id:req.params.userid},{email,name,imageUrl},{new:true});
   res.redirect("/read")
})

app.get("/delete/:id",async (req,res)=>{
   let deleteUser=await user.findOneAndDelete({_id:req.params.id});
   res.redirect("/read")
})

app.listen(3003)