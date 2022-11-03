const mongoose = require('mongoose');


const UserSchema =  new mongoose.Schema({

   details: {

    name:{
        type:String,
        required:true,
    



    },
    gmail:{
        type: String,
        required: true,
        // match: /.+\@.+\..+/,
        unique: true,
        

    },
    password:{
        type:String,
        required: true,
        

    
},
   },
   
   stock: {
    avialableBalance:{
        type: Number,
        default: 100000,
    

    },

    holding:[
        {
        ticker:{type: String,},
        amount:{type: Number, min:0},
        price:Number 
    }],
    history:[{
        ticker: String,
        amount:Number,
        price:Number,
        kind: String,
        date: Date,

    }],
    WatchList:[
        {
        ticker:{type: String,}
        
    }]


   }

   



});

const UserModel = mongoose.model("users", UserSchema)
module.exports = UserModel;