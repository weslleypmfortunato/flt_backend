// import mongoose from "mongoose";

// const {Schema, model} = mongoose

// const ncrSchema = new Schema({
//   title: {
//     type: String,
//     required: true
//   },
//   reference: {
//     type: String,
//     required: true
//   },
//   creator: {
//     type: String,
//     required: true
//   },
//   location: {
//     type: String,
//     required: true
//   },
//   ncrDate: Date,
//   description: {
//     type: String,
//     required: true
//   }
// }, {timestamps: true})

// export default model ('NCR', ncrSchema)


import mongoose from "mongoose";

const { Schema, model } = mongoose;

const ncrSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  reference: {
    type: String,
    required: true
  },
  creator: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  ncrDate: Date,
  description: {
    type: String,
    required: true
  },

  // Campos novos:
  causeOfNcr: {
    type: String,
  },
  closeOutDate: {
    type: Date,
  },
  reasonForClosure: {
    type: String,
  },
  latestDisposition: {
    type: String,
  },
  closer: {
    type: String,
  }

}, {timestamps: true});

export default model('NCR', ncrSchema);