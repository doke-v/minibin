const mongoose = require('mongoose')

const pasteSchema = mongoose.Schema({
    text: { type: String, required: true },
    id: { type: String, required: true },
    user: { type: String, required: false }
})

module.exports = mongoose.model('Paste', pasteSchema)