const { Router } = require('express');

const router = new Router();

router.get('/', (req, res) => {
    res.send('access_token page'); 
});

module.exports = router;