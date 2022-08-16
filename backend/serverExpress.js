const http=require('http')
const mongoose=require('mongoose')
const express=require('express')
const cors=require('cors')
const app=express()

app.use(express.json())
require('dotenv').config()

const uri=process.env.CONNECT_DB
mongoose.connect(uri)
.then((res)=>{
    console.log("Connection Established")
})
.catch((err)=>{
    console.log(err)
})

app.use(cors())
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))

const userDetailsRouter=require('./routes/user-details')
app.use('/user-details',userDetailsRouter)

app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Headers',"*")
    next()
})



app.listen('6006',()=>{
    console.log("server running")
})