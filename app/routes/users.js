const { Router } = require('express');
const router = new Router();
const User = require('../model/user.model');

router.put('/users/', async (req, res) => {
    const data = req.body;
    const name = req.query.name;
    
    const user = await User.findOne({ display_name: name }).exec();

    if (!user) {
        res.status(404).json('User not found');
        return;
    };

    user.display_name = data.display_name;
    user.country = data.country;

    await user.save();

    res.status(200).json(user);
});

module.exports = router;