const CustomerModel= require("../../models/customer");
const jwt = require("jsonwebtoken");
const config = require("config");
exports.registerCustomer = async (req,res)=>{
    try {
        const {body} = req;
        const customer = await CustomerModel.findOne({email:body.email});
        if (customer){
            return res.status(401).json("Email exists");
        }
        const isPhoneNumberExists = await CustomerModel.findOne({phone:body.phone});
        if (isPhoneNumberExists){
            return res.status(401).json("Phone number exists");
        }
        await new CustomerModel({
            fullName: body.fullName,
            email:body.email,
            password:body.password,
            phone:body.phone,
            address:body.address,
        }).save();
        return res.status(201).json("Created customer successfully");
    } catch (error) {
        return res.status(500).json(error);
    }
}
exports.loginCustomer = async (req,res)=>{
    try { 
        const {body} = req;
        const customer = await CustomerModel.findOne({email:body.email});
        if(!customer){
            return res.status(401).json("Email not valid");
        }
        const validPassword = customer.password === body.password;
        if(!validPassword){
            return res.status(401).json("Password not valid");
        }
        if(customer && validPassword){
            const accessToken = jwt.sign(
                {email:body.email, password:body.password},
                config.get("app.jwtAccessKey"),
                {expiresIn:"1d"}
            );
            res.cookie("token",accessToken);
            const {password,...others} = customer._doc;
            return res.status(200).json({
                ...others,
                accessToken,
            });
        }
    } catch (error) {
        return res.status(500).json(error);
    }
}