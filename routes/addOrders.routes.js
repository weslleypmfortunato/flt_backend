import { Router } from "express";
//import Orders from '../models/Orders.model.js'
import NewOrders from "../models/newOrders.model.js"
import 'dotenv/config'
import isAuthenticatedMiddleware from "../middlewares/isAuthenticatedMiddleware.js"

const addOrdersRouter = Router()

addOrdersRouter.post('/orders/new', isAuthenticatedMiddleware, async (req, res) => {
  const {workOrderNumber, productName, productDescription, orderQty, priority, owner, status, material, remarks, deleteStatus, orderLink} = req.body

  try {

    const newOrder = await NewOrders.create({ workOrderNumber, productName, productDescription, orderQty, priority, owner, status, material, remarks, deleteStatus, orderLink })


    if (newOrder) {
      return res.status(201).json({message: "Order placed succesfully!"})
    }
  } catch (error) {
    console.log(error)
    return res.status(500).json({message: "Internal Server Error!"})
  }
})

addOrdersRouter.get('/orders', isAuthenticatedMiddleware, async (req, res) => {
  try {
    const workOrdersList = await NewOrders.find().sort({priority: 1})
    return res.status(200).json(workOrdersList)
  } catch (error) {
    console.log(error)
    return res.status(500).json({message: "Internal Server Error!"})
  }
})

addOrdersRouter.get('/order/:id', isAuthenticatedMiddleware, async (req, res) => {
  try {
    const {id} = req.params
    const workOrderId = await NewOrders.findById(id)

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

    const updateWorkOrder = await NewOrders.findByIdAndUpdate({_id: id}, payload, {new: true})
    return res.status(200).json(updateWorkOrder)
  } catch (error) {
    console.log(error)
    return res.status(500).json({message: "Internal Server Error"})
  }
})

addOrdersRouter.delete('/order/:id', isAuthenticatedMiddleware, async (req, res) => {
  const {id} = req.params
  try {
    await NewOrders.findByIdAndDelete({_id: id})
    return res.status(204).json({message: "Work Order deleted succesfully"})
  } catch (error) {
    console.log(error)
    return res.status(500).json({message: "Internal Server Error"})
  }
})

addOrdersRouter.put('/order/updateDeleteStatus/:id', isAuthenticatedMiddleware, async (req, res) => {
  try {
    const { id } = req.params
    const { deleteStatus } = req.body

    const updatedOrder = await NewOrders.findByIdAndUpdate(id, { deleteStatus }, { new: true })
    if (!updatedOrder) {
      return res.status(404).json({ message: "Work Order not found." })
    }
    return res.status(200).json(updatedOrder)
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" })
  }
})

addOrdersRouter.get('/completed/orders', isAuthenticatedMiddleware, async (req, res) => {
  try {
    const completedWorkOrdersList = await NewOrders.find().sort({updatedAt: -1})
    return res.status(200).json(completedWorkOrdersList)
  } catch (error) {
    console.log(error)
    return res.status(500).json({message: "Internal Server Error"})
  }
})

export default addOrdersRouter