const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const  Cookies =require ('js-cookie');
const UserModel = require('./models/Users')

const app = express();
require('dotenv').config()



app.use(express.json());
app.use(cookieParser());
app.use(cors());



function authenticateToken(req, res, next) {

    const token = req.headers.authorization;
    console.log(req.headers)
    console.log("--" + token)
    console.log(req.body)
    
    if (token == null) return res.sendStatus(401);
    
  
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) return res.sendStatus(403).send('access deniend');
      req.user = user
      console.log(user)
      next()
    })
  }

const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://or1:goodor32@cluster0.qs9b3tg.mongodb.net/mern-tutorial?retryWrites=true&w=majority");


app.get("/", (req,res)=>{
    res.send("working")
})

app.get("/getuser", authenticateToken, async (req,res)=>{
    const user =   await UserModel.findOne({_id: req.user.id});
    
    res.json(user)

});

app.put("/add",authenticateToken,async(req,res)=>{
    const ticker = req.body.ticker;
    
    const user =   await UserModel.findOne({_id: req.user.id});
    const exist =  await UserModel.findOne({'stock.WatchList':{  $elemMatch: { ticker: ticker } },'details.gmail': req.user.gmail});
    if(exist){


    }
    else{
        UserModel.updateOne({_id: req.user.id},{ $push: {"stock.WatchList":{ticker:ticker}}}).then((obj) =>{console.log(obj)})


    }
    res.status(200);
    res.json("complete")
} )


app.put("/remove",authenticateToken,async(req,res)=>{
    const ticker = req.body.ticker;
    const user =   await UserModel.findOne({_id: req.user.id});
    const exist =  await UserModel.findOne({'stock.WatchList':{  $elemMatch: { ticker: ticker } },'details.gmail': req.user.gmail});
    if(exist){
        UserModel.updateOne({_id: req.user.id},{ $pull: {'stock.WatchList':{  ticker: ticker }}}).then((obj) =>{console.log(obj)})


    }
    else{
        

    }
    res.status(200);
    res.json("complete")
} )



app.put("/buy",authenticateToken, async(req,res)=>{
    const ticker = req.body.ticker;
    const amount = req.body.amount;
    const price = req.body.price;
    console.log(req.user.gmail)
    //'stock.holding':{  $elemMatch: { ticker: ticker } }, 
    const user =   await UserModel.findOne({_id: req.user.id});
    const exist =  await UserModel.findOne({'stock.holding':{  $elemMatch: { ticker: ticker } },'details.gmail': req.user.gmail});
    console.log(user.stock.avialableBalance)
    if(exist){
        

       
        
        UserModel.updateOne({_id: req.user.id, "stock.holding.ticker":ticker},{ $inc: {"stock.holding.$.amount":amount }}).then((obj) =>{console.log(obj)})
        UserModel.updateOne({_id: req.user.id, "stock.holding.ticker":ticker},{ $inc: {"stock.holding.$.price":price }}).then((obj) =>{console.log(obj)})
        UserModel.updateOne({_id: req.user.id},{ $push: {"stock.history":{ticker:ticker, amount:amount, price:price, kind:"buy", date:Date.now()} }}).then((obj) =>{console.log(obj)})
        UserModel.updateOne({_id: req.user.id, "stock.holding.ticker":ticker}, {$inc:{'stock.avialableBalance': -price}}).then((obj) =>{console.log(obj)})

        
        

        console.log("exist")
    }
    else{
        UserModel.updateOne({_id: req.user.id},{ $push: {"stock.holding":{ticker:ticker, amount:amount, price:price} }}).then((obj) =>{console.log(obj)})
        UserModel.updateOne({_id: req.user.id},{ $push: {"stock.history":{ticker:ticker, amount:amount, price:price, kind:"buy", date:Date.now()} }}).then((obj) =>{console.log(obj)})
        UserModel.updateOne({_id: req.user.id, "stock.holding.ticker":ticker}, {$inc:{'stock.avialableBalance': -price}}).then((obj) =>{console.log(obj)})
        


        console.log(" dont exist")

    }
    res.status(200);
    res.json("complete")

   
});


app.put("/sell",authenticateToken, async(req,res)=>{
    const ticker = req.body.ticker;
    const amount = req.body.amount;
    const price = req.body.price;
    console.log(req.user.gmail)
    const all = req.body.all;
    //'stock.holding':{  $elemMatch: { ticker: ticker } }, 
    const exist =  await UserModel.findOne({'stock.holding':{  $elemMatch: { ticker: ticker } },'details.gmail': req.user.gmail});
    
    if(exist){
        
        if(all== false){
        UserModel.updateOne({_id: req.user.id, "stock.holding.ticker":ticker},{ $inc: {"stock.holding.$.amount":-amount }}).then((obj) =>{console.log(obj)})
        UserModel.updateOne({_id: req.user.id, "stock.holding.ticker":ticker},{ $inc: {"stock.holding.$.price":-price }}).then((obj) =>{console.log(obj)})
        UserModel.updateOne({_id: req.user.id},{ $push: {"stock.history":{ticker:ticker, amount:amount, price:price, kind:"sell", date:Date.now()} }}).then((obj) =>{console.log(obj)})
        UserModel.updateOne({_id: req.user.id, "stock.holding.ticker":ticker}, {$inc:{'stock.avialableBalance': price}}).then((obj) =>{console.log(obj)})

        }
        else{
            
        UserModel.updateOne({_id: req.user.id},{ $pull: {'stock.holding':{  ticker: ticker }}}).then((obj) =>{console.log(obj)})
        UserModel.updateOne({_id: req.user.id},{ $push: {"stock.history":{ticker:ticker, amount:amount, price:price, kind:"sell", date:Date.now()} }}).then((obj) =>{console.log(obj)})
        UserModel.updateOne({_id: req.user.id, "stock.holding.ticker":ticker}, {$inc:{'stock.avialableBalance': price}}).then((obj) =>{console.log(obj)})
        
        }

        
        
        res.status(200);
        res.json("complete")
        
    }
    else{
        res.json("no stock left to sell");
        res.status(400);
        


        

    }


   
});



app.post("/signup", async (req,res)=>{

    const {name,gmail,password} =req.body;
    const salt = await bcrypt.genSalt(10);
    const hashpassword = await bcrypt.hash(password, salt);
    UserModel.findOne({'details.gmail':gmail},(err,user)=>{
        if(user){
            res.json({ status: 409, body: "conflict" })
        }else {
            const user = new UserModel({
        details:{
            name: req.body.name,
            gmail: req.body.gmail,
            password: hashpassword
            },
            stock:{
                holding:{
                    
                },
                history:{
                    amount:100000,
                    date:new Date().getTime()
                }
            }
    
            
        
        })
              user.save(err=>{
                if(err){
                    res.json({ status: 404, body: err })
                }else{
                    res.json({ status: 200, body: "succefull" })
                }
            })
        }
    })
   

} );

app.post("/signin", async (req,res) =>{
    
    const {gmail, password} = req.body;
    const exist =  await UserModel.findOne({'details.gmail': gmail});
    
    if(exist){
        if(await bcrypt.compare (password ,exist.details.password)){
            
            
            const token = jwt.sign(
                {
                    id: exist.id,
                    gmail:exist.details.gmail,
                    
                   
                },
                process.env.ACCESS_TOKEN_SECRET,{
                    expiresIn: ('1 days')
                });
            
            res.status(200).json({ status: 200, data: token })

            
            
            

        }
        else{
        res.json({ status: 404, body: "wrong password" })
        


        }
    }
    else{
        res.json({ status: 404, body: "user doesnt exists" })
        
    }
});




app.listen(process.env.PORT, ()=>{
    console.log("server running on 3000")
});