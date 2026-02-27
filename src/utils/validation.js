const validator = require("validator");

const validateSignUpData = (req) =>{
    const { firstName, lastName, emailId, password} = req.body;

    if(!firstName || !lastName)
    {
        throw new Error("Name is not valid");
    }
    else if(!validator.isEmail(emailId))
    {
        throw new Error("Email is Not Valid");
    }
    else if(!validator.isStrongPassword(password))
    {
        throw new Error("Password is Not Strong");
    }
};


const validateEditProfileData = (req,next) =>{
    const allowedEditFields = ["firstName" ,"lastName", "about","skills","age","gender","photourl"];

    const isEditAllowed = Object.keys(req.body).every((field) => allowedEditFields.includes(field));

    return isEditAllowed;
}

module.exports ={
    validateSignUpData,
    validateEditProfileData
};