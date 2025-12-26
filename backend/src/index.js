import express from 'express'
import dotenv from 'dotenv'
import dbConnect from './db/db.js'
import app from './app.js'

dotenv.config({
    path: './.env'
})

const port = process.env.PORT || 4000

dbConnect()
    .then(()=>{
        app.listen(port, ()=>{
            console.log(`Server running on PORT ${port}`);
        })
    })
    .catch((err)=>{
        console.error(`Database connection error!!`);
        process.exit(1)
    })