import { Router } from "express";
import Orders from '../models/Orders.model.js'

const addOrdersRouter = Router()

addOrdersRouter.post('/orders', async (req, res) => {
  const {workOrderNumber, productName, productDescription, orderQty, priority, owner, remarks} = req.body

  try {

    const newOrder = await Orders.create({ workOrderNumber, productName, productDescription, orderQty, priority, owner, remarks })

    if (newOrder) {
      return res.status(201).json({message: "Order placed succesfully"})
    }
  } catch (error) {
    console.log(error)
    return res.status(500).json({message: "Internal Server Error"})
  }
})

addOrdersRouter.get('/orders', async (req, res) => {
  try {
    const workOrdersList = await Orders.find().sort({priority: 1})
    return res.status(200).json(workOrdersList)
  } catch (error) {
    console.log(error)
    return res.status(500).json({message: "Internal Server Error"})
  }
})

addOrdersRouter.get('/order/:id', async (req, res) => {
  try {
    const {id} = req.params
    const workOrderId = await Orders.findById(id)

    if (!workOrderId) {
      return res.status(404).json({message: "Work Order not found."})
    }
    return res.status(200).json(workOrderId)
  } catch (error) {
    console.log(error)
    return res.status(500).json({message: "Internal Server Error"})
  }
})

addOrdersRouter.put('/order/edit/:id', async (req, res) => {
  try {
    const payload = req.body
    const {id} = req.params

    const updateWorkOrder = await Orders.findByIdAndUpdate({_id: id}, payload, {new: true})
    return res.status(200).json(updateWorkOrder)
  } catch (error) {
    console.log(error)
    return res.status(500).json({message: "Internal Server Error"})
  }
})

addOrdersRouter.delete('/order/:id', async (req, res) => {
  const {id} = req.params
  try {
    await Orders.findByIdAndDelete({_id: id})
    return res.status(204).json({message: "Work Order deleted succesfully"})
  } catch (error) {
    console.log(error)
    return res.status(500).json({message: "Internal Server Error"})
  }
})

export default addOrdersRouter