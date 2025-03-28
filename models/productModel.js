const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    status: {
        type: String,
        default: "pending"
    }

})

const taskModel = mongoose.model('product', taskSchema);

module.exports = taskModel;