import mongoose from "mongoose";

const { Schema, model} = mongoose

const shortagesSchema = new Schema({
  materialName: {
    type: String,
    required: true
  },
  materialQty: { 
    type: Number,
    required: true
  },
  shortageRemark: String
}, {timestamps: true})

export default model ('Shortages', shortagesSchema)