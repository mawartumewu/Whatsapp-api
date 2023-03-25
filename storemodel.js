const { ObjectId } = require('mongoose');
const mongoose = require('mongoose');

const store = new mongoose.Schema({
    session: {
        type: String,
        // required: true 
    },
})

module.exports = mongoose.model('store', store)


