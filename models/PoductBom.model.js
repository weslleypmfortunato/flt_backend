import mongoose from "mongoose";

const {Schema, model} = mongoose

const productBomSchema = new Schema ({
  productName: {
    type: String,
    required: true
  },
  materialPartNumber: {
    type: String,
    required: true
  },
  materialDescription: {
    type: String,
    required: true
  },
  materialQty: {
    type: Number,
    required: true
  }
}, {timestamps: true})

export default model ('productBom', productBomSchema)