const router = require('express').Router();
const Users = require('../model/User')
const validation = require('../validation')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')


router.post('/register', async(req,res) => {
    
    //check valid
    const checkValid = validation.registerValuedation(req.body);
    if(checkValid) return res.status(400).send(checkValid)


    //check userIsExist
    const userIsExist = await Users.findOne({name:req.body.name})
    if(userIsExist){
        return res.status(400).send("Đã tồn tại")
    }

    //hash passwords
    const salt = await bcryptjs.genSalt(10);
    const hashPassWords = await bcryptjs.hash(req.body.passWord,salt);


    //add new user
    const newUser = new Users ({
        name: req.body.name,
        id: req.body.id,
        passWord: hashPassWords
    });

    try{
        const savedUser = await newUser.save(function(err){
            if(err) return handleError(err);
            res.send('Thêm mới thành công!!');
        })
        
    }catch(err){
        console.log(err)
        res.status(400).send(err);
    }
});

router.post('/login', async (req,res) => {

    //check valid
    const errValid = validation.loginValuedation(req.body);
    if(errValid) return res.status(400).send("Tên người dùng hoặc mật khâu không hợp lệ !!");
    
    //check isExitUser
    const isExist = await Users.findOne({name:req.body.name})
    if(!isExist)  return res.status(400).send("Người dùng k tồn tại");

    //Check passWord

    const validPass = await bcryptjs.compare(req.body.passWord,isExist.passWord);
    if(!validPass) return res.status(400).send('Invalid passWord!!!');

    const token = jwt.sign({_id:isExist.id}, process.env.ACCESS_TOKEN_SECRET)
    res.json({accessToken:token})
})

module.exports = router