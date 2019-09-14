require('dotenv').config()
const MONGODB_URL = process.env.MONGODB_URL;
const express = require('express')
const app = express()

const pasteRoutes = require('./api/routes/pastes')
const mongoose = require('mongoose')

mongoose.connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })

app.use(express.json())
app.use('/bin/api', pasteRoutes)

app.listen(5000)