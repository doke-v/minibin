const mongoose = require('mongoose')

const pasteSchema = mongoose.Schema({
    text: {type: String, required: true},
    id: {type: String, required: true}
})

module.exports = mongoose.model('Paste', pasteSchema)