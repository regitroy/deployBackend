const mongoose = require("mongoose");

module.exports = {
    connect: (url) => {
        mongoose.set('useCreateIndex', true);
        mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
    }
};
