const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
const mongoose = require('mongoose');

const app = express();
app.set('view engine', 'ejs');

app.use(express.static("public"));


app.use(bodyParser.urlencoded({extended:true}));
mongoose.connect("mongodb://localhost:27017/toDoListDB",{useNewUrlParser: true});

 

 const itemSchema = new mongoose.Schema({
     item_name:{
        type:String, 
        required :[true,"item name missing"]
     }
 })

 const ItemModel = new mongoose.model("Item",itemSchema);
 
 const item1 = new ItemModel({
     item_name:"Eat"
 })
 const item2 = new ItemModel({
    item_name:"Sleep"
})
const item3 = new ItemModel({
    item_name:"Conquer"
})
const item4 = new ItemModel({
    item_name:"Repeat"
})

const defaultItems = [item1,item2,item3,item4];

ItemModel.insertMany(defaultItems,function(err){
    if(err){
        console.log(err)
    }
    else{
        console.log("jj")
    }
})




app.get("/" , function(req,res){
    
    ItemModel.find({},function(err,findItems){
        if(err){
            console.log(err)
        }
        else{
            res.render("list" , {kindOfList:"Today" , listSentByServer:findItems});
        }
    }) 
    

})

app.get("/work",function(req,res){
    res.render("list" , {  kindOfList:"Work-List"  ,listSentByServer:items});

})



app.post("/",function(req,res){
    var item = req.body.TD1;
    if (req.body.list === "Work-List"){
        items.push(item);
        res.redirect("/work");
    }
    else{
        
        items.push(item);
        res.redirect("/");
    
    }
})
app.get("/about",function(req,res){
    res.render("about");
})

app.listen(3000 , function(){
    console.log("serving at port 3000")
})