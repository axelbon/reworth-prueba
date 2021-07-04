const express = require('express');
module.exports = () => {

    const app = express();

    // middlewares
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());

    // routes
    /*app.use(require('./routes'));
    app.use('/api/movies', require('./routes/movies'));
    app.use('/api/users', require('./routes/users'));*/

    // starting the server
    app.listen(3000, () => {
        console.log(`Server on port 3000`);
    });
    
    return app;
}
