import { Router } from "express";
import ProductBom from '../models/PoductBom.model.js'

const bomRouter = Router()

bomRouter.post('/bom', async (req, res) => {
  const {productName, materialPartNumber, materialDescription, materialQty} = req.body
  try {
    const materialExists = await ProductBom.findOne({materialPartNumber})
    if (materialExists) {
      throw new Error('Materials cannot be used twice.')
    }

    const product = await ProductBom.create({productName, materialPartNumber, materialDescription, materialQty})
    console.log("Aqui", product)

    if (product) {
      return res.status(201).json({message: "Material added succesfully"})
    }
  } catch (error) {
    console.log(error)

    if (error.message === "Materials cannot be used twice.") {
      return res.status(409).json({message: "Material code already in use."})
    }
    return res.status(500).json({message: "Internal Server Error"})
  }
})

bomRouter.get('/bom', async (req, res) => {
  try {
    const products = await ProductBom.find().sort({materialPartNumber: 1})
    return res.status(200).json(products)
  } catch (error) {
    console.log(error)
    return res.status(500).json({message: "Internal Server Error"})
  }
})

bomRouter.get('/bom/:id', async (req,res) => {
  try {
    const {id} = req.params
    const materialId = await ProductBom.findById(id)

    if (!materialId) {
      return res.status(404).json({message: "Material not found"})
    }
    return res.status(200).json(materialId)
  } catch (error) {
    console.log(error)
    return res.status(500).json({message: "Internal Server Error"})
  }
})

bomRouter.put('/bom/edit/:id', async (req, res) => {
  try {
    const payload = req.body
    const {id} = req.params

    const updateMaterial = await ProductBom.findByIdAndUpdate({_id: id}, payload, {new: true})
    return res.status(200).json(updateMaterial)
  } catch (error) {
    console.log(error)
    return res.status(500).json({message: "Internal Server Error"})
  }
})

bomRouter.delete('/bom/:id', async (req, res) => {
  const {id} = req.params
  try {
    await ProductBom.findByIdAndDelete({_id: id})
    res.status(204).json({message: "Material deleted succesfully"})
  } catch (error) {
    console.log(error)
    return res.status(500).json({message: "Internal Server Error"})
  }
})

export default bomRouter