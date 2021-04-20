const router = require('express').Router();
const Users = require('../model/User');
const verifyToken = require('../verifyToken.js')

router.get('/getAll', verifyToken, async (req,res) => {
    const fillter = {}
    const lst = await Users.find(fillter)
    res.send(lst);
});

module.exports = router;