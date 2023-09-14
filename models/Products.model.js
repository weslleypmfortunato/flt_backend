import mongoose from "mongoose";

const { Schema, model } = mongoose

const productSchema = new Schema ({
  productName: {
    type: String,
    required: true
  },
  productDescription: {
    type: String,
    required: true
  },
  productBom: {
    type: String,
    required: true
  }
}, {timestamps: true})

export default model ('Products', productSchema)