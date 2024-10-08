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
    enum: ["In Progress", "Partially Completed", "Completed", "Missing Parts", "Expedite", ""]
  },
  material: {
    type: String,
    enum: ["Picked", "Not Picked", "Partially", "Shortage", ""]
  },
  priority: {
    type: Number
  },
  owner: String,
  remarks: String,
  deleteStatus: {
    type: Boolean,
    default: false
  },
  orderLink: String
}, {timestamps: true})

export default model ('Orders', orderSchema)