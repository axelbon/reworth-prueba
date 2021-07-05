const { Router } = require('express');
const Criterio = require('../model/criterio.model');
const router = new Router();

router.get('/criterios', async (req, res) => {

    const criterio = await Criterio.find(null, null, {
        limit: 5,
        sort: {
            total: -1 
        }
    });

    res.json(criterio);
});

module.exports = router;