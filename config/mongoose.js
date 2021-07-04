module.exports = () => {
    const mongoose = require('mongoose');
    mongoose.connect('mongodb+srv://dbUserAxel:dNR74A7C6q8kU1iP@reworth-cluster.jgsz0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
        .then((db) => console.log("db is connected"))
        .catch((err) => console.log(err));
};

//dNR74A7C6q8kU1iP