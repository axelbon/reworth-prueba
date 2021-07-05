const express = require('express');
const {port} = require('./env/development.env');
module.exports = () => {

    const app = express();

    // middlewares
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());

    // routes
    app.use(require('../app/routes'));
    app.use(require('../app/routes/spotify'));
    /*
    app.use('/api/movies', require('./routes/movies'));
    app.use('/api/users', require('./routes/users'));*/

    // starting the server
    app.listen(port, () => {
        console.log(`Server listening on port ${port}`);
    });
    
    return app;
}
