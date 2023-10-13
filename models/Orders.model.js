import mongoose from "mongoose";

const {Schema, model} = mongoose

const orderSchema = new Schema({
  workOrderNumber: {
    type: String,
    required: true
  },
  productName: {
    type: String,
    required: true
  },
  productDescription: {
    type: String,
    required: true
  },
  orderQty: {
    type: String,
    required: true
  },
  priority: {
    type: Number,
    required: true
  },
  owner: String,
  remarks: String
}, {timestamps: true})

export default model ('Orders', orderSchema)