import mongoose from "mongoose";

const { Schema, model } = mongoose

const noticesSchema = new Schema({
  information: {
    type: String,
    required: true
  }
}, {timestamps: true})

export default model ('Notices', noticesSchema)