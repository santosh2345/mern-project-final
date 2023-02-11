const dotenv = require("dotenv");
const mongoose = require('mongoose');
const express = require('express');
const app = express();

dotenv.config({path:'./config.env'});
const path = require('path')




require('./db/conn');
app.use(express.json());

const User = require('./model/userSchema');

//linking the router files to make routing easy..
app.use(require('./router/auth'));

app.use(express.static(path.join(__dirname,'./client/build')));

app.get("*",function(req,res){
    res.sendFile(path.join(__dirname,"./client/build/index.html"));
})


const PORT = process.env.PORT;


const cookieParser = require("cookie-parser");
app.use(cookieParser());


app.get('/contact',(req,res)=>{
    res.cookie('testiing','santoshgiri',{
        expires: new Date(Date.now()+500),
        httpOnly:true
    });
    res.send(`this is contact page`);
});
app.get('/signin',(req,res)=>{
    res.send(`this is signin page`);
});
app.get('/signup',(req,res)=>{
    res.send(`this is signup page`);
});

app.listen(PORT,()=>{
    console.log(`server started to specified port number`)
})