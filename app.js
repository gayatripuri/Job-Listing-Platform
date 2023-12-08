const express= require('express')
require("dotenv").config();
const mongoose=require('mongoose')
const app=express();

app.get('/', (req,res)=>{
    res.send("all good")
})




app.listen(process.env.PORT, () => {
    mongoose
      .connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => {
        console.log('Database connection is successful');
      })
      .catch((error) => {
        console.error('Error connecting to the database:', error);
      });
  
    console.log(`Server running on http://localhost:${process.env.PORT}`);
  });
