import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name:{
        required:true,
        type:String,  
    },
    email:{
        required:true,
        type:String,
        unique:true
    }, 
    description:{
        required:true,
        type:String
    },
    profilepic:{
        type:String,
        default:""
    },
    isAdmin: { type: Boolean, default: false }, // Admin flag
    location : String,
    geometry: {
        type: {
            type: String,
            enum: ['Point'],
            default: 'Point' 
        },
        coordinates: {
          type: [Number],
          required: true
        }
      },
},
);

const User = new mongoose.model("User",userSchema);
export default User;