const express= require('express')
require("dotenv").config();
const app=express();

app.get('/', (req,res)=>{
    res.send("all good")
})



app.listen(process.env.PORT, ()=>{
    console.log("server runnning on localhost:${process.env.PORT}")
})