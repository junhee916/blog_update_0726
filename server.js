require('dotenv').config()
const express = require('express')
const app = express()

// middleware
const userRouter = require('./router/user')
const boardRouter = require('./router/board')
const commendRouter = require('./router/commend')

app.use('/user', userRouter)
app.use('/board', boardRouter)
app.use('./commend', commendRouter)

const PORT = process.env.PORT || 7000

console.log(PORT, console.log('connected server...'))