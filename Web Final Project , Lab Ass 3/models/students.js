const mongoose = require("mongoose");
let modelSchema = mongoose.Schema({
 
    
    productName:  String, 
    
    productImage: { type: String },



});
let Model = mongoose.model("Students", modelSchema);
module.exports = Model;
