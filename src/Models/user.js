
const mongoose = require("mongoose");           //imported mongoose from library

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
    },
    password: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        min:18,
    },
    gender: {
        type: String,
        validate(value){                         //only works when the user signup
            if(!["male","female","others"].includes(value))
            {
                throw new Error("Gendor data is Invalid");
            }
        }
    },
    photoUrl: {
        type: String,

    },
    skills: {
        type: [String],
    }
},
{
    timestamps:true,
}
);


// const User = mongoose.model("User", userSchema);

// module.exports = User;

module.exports = mongoose.model("User", userSchema);