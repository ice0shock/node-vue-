const mongoose = require('mongoose')
const schema = new mongoose.Schema({
    categories: [{
        type: mongoose.SchemaTypes.ObjectId ,ref:'Category'
    }],
    title: {
        type: String
    },
    content: {
        type: String
    }
})
module.exports = mongoose.model('Article', schema)