import mongoose from "mongoose";

const { Schema, model } = mongoose

const addQtySchema = new Schema ({
  productCode: {
    type: Schema.Types.ObjectId,
    ref: "Inventory",
    required: true
  },
  addedQty: {
    type: Number,
    required: true
  }
}, {timestamps: true})

export default model ('NewQuantity', addQtySchema)