const mongoose = require('mongoose');

const userSchema = new  mongoose.Schema({
    id:{
        type:Number,
        require:true,
        min:1
    },
    name: {
        type:String,
        require:true,
        min:6
    },
    passWord: {
        type:String,
        require:true,
        min:6
    }
});

module.exports = mongoose.model('Users',userSchema)

