const mongoose = require('mongoose');
const {dbUri} = require('./env/development.env')
module.exports = () => {
    mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log("db is connected successfully"))
        .catch((err) => console.log(`error connecting the database ${err}`));
};

//dNR74A7C6q8kU1iP