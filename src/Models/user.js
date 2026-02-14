
const mongoose = require("mongoose");           //imported mongoose from library

const validator = require("validator");

const jwt = require("jsonwebtoken");

const bcrypt =require("bcrypt");

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 4,
        maxLength: 50,
    },
    lastName: {
        type: String,
    },
    emailId: {
        type: String,
        unique: true,
        lowercase:true,
        required:true,
        trim: true,

        validate(value)
        {
            if(!validator.isEmail(value))
            {
                throw new Error("Invalid email address: " + value);
            }
        }
    },
    password: {
        type: String,
        required: true,
         validate(value)
        {
            if(!validator.isStrongPassword(value))
            {
                throw new Error("Invalid password: " + value);
            }
        }
    },
    age: {
        type: Number,
        min:18,
    },
    gender: {
        type: String,
        enum:{
            values:["male","female","others"],
            message:`{VALUE} is not a valid gender type`
        }
        // validate(value){                         //only works when the user signup
        //     if(!["male","female","others"].includes(value))
        //     {
        //         throw new Error("Gendor data is Invalid");
        //     }
        // }
    },
    photoUrl: {
        type: String,
         validate(value)
        {
            if(!validator.isURL(value))
            {
                throw new Error("Invalid photo URL: " + value);
            }
        }

    },
    skills: {
        type: [String],
        minItems:5,
    }
},
{
    timestamps:true,
}
);


userSchema.index({firstName:1, lastName:1});  //arranges the data in ascending order,so findbyId,findOne will work faster



userSchema.methods.getJWT =async function (){
    const user = this;

    const token =await jwt.sign({_id:user._id},"YokeshHashedInEmployee@2026",{expiresIn:"1d"}) ;     ////hiding the userid inside the token

    return token;

}

userSchema.methods.validatePassword = async function(passwordInputByUser)
{
    const user = this;
    const isValid =await bcrypt.compare(passwordInputByUser,user.password);

    return isValid;
}


// const User = mongoose.model("User", userSchema);

// module.exports = User;

module.exports = mongoose.model("User", userSchema);