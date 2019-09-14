require('dotenv').config()
const url = process.env.MONGODB_URL;
const express = require('express')
const app = express()

const pasteRoutes = require('./api/routes/pastes')
const mongoose = require('mongoose')

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

app.use(express.json())
app.use('/bin/api', pasteRoutes)

app.listen(5000)