import mongoose from "mongoose";

const { Schema, model} = mongoose

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  level: {
    type: String,
    enum: ["admin", "user"],
    required: true
  },
  passwordHash: {
    type: String,
    required: true
  },
  department: {
    type: String,
    enum: ["production", "engineering", "sales", "hr", "marketing", "warehouse", "finance"]
  },
  comments: String,
  dob: String,
  phoneNumber: String,
  position: {
    type: String,
    required: true
  },
  startingDate: String,
  emergencyContact: String,
  currentStatus: {
    type: Boolean,
    default: true
  }
}, {timestamps: true})

export default model ('User', userSchema)