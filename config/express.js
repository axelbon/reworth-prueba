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
    app.use(require('../app/routes/users'));
    app.use(require('../app/routes/criterio'))
    // starting the server
    app.listen(port, () => {
        console.log(`Server listening on port ${port}`);
    });
    
    return app;
}
