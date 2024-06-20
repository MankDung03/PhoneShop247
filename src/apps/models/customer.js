const mongoose = require("../../common/database")();
const customerSchema = new mongoose.Schema({
    fullName:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        unique:true,
        require:true,
    },
    password:{
        type:String,
        require:true,
    },
    phone:{
        type:String,
        unique:true,
        require:true,
    },
    address:{
        type:String,
        require:true,
    },
}, {timestamps: true});
const CustomerModel = mongoose.model("Customers", customerSchema, "customers");
module.exports = CustomerModel;