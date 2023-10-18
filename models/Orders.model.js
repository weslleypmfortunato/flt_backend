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
  status: {
    type: String,
    enum: ["In Progress", "Partially Completed", "Completed", "Missing Parts", ""]
  },
  priority: {
    type: Number
  },
  owner: String,
  remarks: String
}, {timestamps: true})

export default model ('Orders', orderSchema)