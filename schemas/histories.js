const mongoose = require('mongoose');

module.exports = {
    deploymentId: {
        type: mongoose.Schema.ObjectId,
        required: true,
        index: true
    },
    name: {
        type: String,
        required: true
    },
    version: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    }
}