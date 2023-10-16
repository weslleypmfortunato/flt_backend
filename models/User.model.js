import mongoose from "mongoose";

const { Schema, model } = mongoose

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  level: {
    type: String,
    enum: ["admin", "user", "organizer"],
    required: true
  },
  passwordHash: {
    type: String,
    required: true
  },
  department: {
    type: String,
    enum: ["production", "warehouse"]
  },
  comments: String,
  dob: Date,
  phoneNumber: String,
  position: {
    type: String,
    required: true
  },
  startingDate: Date,
  emergencyContact: String,
}, {timestamps: true})

export default model ('User', userSchema)