const mongoose = require("mongoose");

const itemsSchema = new mongoose.Schema({
    id:Number,
    img:String,
    title:String,
    reviews:String,
    prevPrice:String,
    newPrice:String,
    company:String,
    color:String,
    category:String,
    quantity:Number
});

const Items = new mongoose.model("products", itemsSchema);


module.exports = Items;