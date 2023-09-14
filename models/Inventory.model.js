import mongoose from "mongoose";

const { Schema, model} = mongoose

const inventorySchema = new Schema ({
  partNumber: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  currentQuantity: {
    type: Number,
    required: true
  }
}, {timestamps: true})

export default model ('Inventory', inventorySchema)