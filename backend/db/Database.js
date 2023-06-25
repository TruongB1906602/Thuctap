const mongoose = require("mongoose");
const dotenv = require('dotenv');
const express = require("express");
const app = express();
dotenv.config();

if(process.env.NODE_ENV!=="PRODUCTION"){
    require("dotenv").config({
        path:"./backend/config/.env"
    })}
mongoose.set('strictQuery',false);
const connectDatabase = () =>{
    mongoose.connect(process.env.DB_URL,{
        useNewUrlParser: true,
         useUnifiedTopology: true,
    }).then((data) =>{
        console.log(`Connected to MongoDB Success`);
    })
}

module.exports = connectDatabase