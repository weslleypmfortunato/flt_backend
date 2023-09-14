import { Router } from "express";
import Products from '../models/Products.model.js'

const addProductsRouter = Router()

addProductsRouter.post('/products', async (req, res) => {
  const {productName, productDescription, productBom} = req.body

  try {
    const productExists = await Products.findOne({productName})

    if (productExists) {
      throw new Error('Product name already exists')
    }
    const newProduct = await Products.create({ productName, productDescription, productBom })

    if (newProduct) {
      return res.status(201).json({message: "Product added succesfully"})
    }
  } catch (error) {
    console.log(error)

    if (error.message === "Product name already exists") {
      return res.status(409).json({message: "Product name already in use"})
    }
    return res.status(500).json({message: "Internal Server Error"})
  }
})

addProductsRouter.get('/products', async (req, res) => {
  try {
    const productList = await Products.find().sort({productName: 1})
    return res.status(200).json(productList)
  } catch (error) {
    console.log(error)
    return res.status(500).json({message: "Internal Server Error"})
  }
})

addProductsRouter.get('/product/:id', async (req, res) => {
  try {
    const {id} = req.params
    const productId = await Products.findById(id)

    if (!productId) {
      return res.status(404).json({message: "Product not found."})
    }
    return res.status(200).json(productId)
  } catch (error) {
    console.log(error)
    return res.status(500).json({message: "Internal Server Error"})
  }
})

addProductsRouter.put('/product/edit/:id', async (req, res) => {
  try {
    const payload = req.body
    const {id} = req.params

    const updateProduct = await Products.findByIdAndUpdate({_id: id}, payload, {new: true})
    return res.status(200).json(updateProduct)
  } catch (error) {
    console.log(error)
    return res.status(500).json({message: "Internal Server Error"})
  }
})

export default addProductsRouter