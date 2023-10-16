import { Router } from "express";
import Notices from "../models/Notices.model.js";
import isAuthenticatedMiddleware from "../middlewares/isAuthenticatedMiddleware.js";

const addNoticesRouter = Router()

addNoticesRouter.post('/notice/new', isAuthenticatedMiddleware, async (req, res) => {
  const {information} = req.body

  try {
    const newNotice = await Notices.create({information})

    if (newNotice) {
      return res.status(201).json({message: "Notice added succesfully"})
    }
  } catch (error) {
    console.log(error)
    return res.status(500).json({message: "Internal Server Error"})
  }
})

addNoticesRouter.get('/notices', isAuthenticatedMiddleware, async (req, res) => {
  try {
    const noticesList = await Notices.find().sort({timestamps: 1})
    return res.status(200).json(noticesList)
  } catch (error) {
    console.log(error)
    return res.status(500).json({message: "Internal Server Error"})
  }
})

addNoticesRouter.get('/notice/:id', isAuthenticatedMiddleware, async (req, res) => {
  try {
    const {id} = req.params
    const noticeId = await Notices.findById(id)

    if (!noticeId) {
      return res.status(404).json({message: "Notice not found"})
    }
    return res.status(200).json(noticeId)
  } catch (error) {
    console.log(error)
    return res.status(500).json({message: "Internal Server Error"})
  }
})

addNoticesRouter.put('/notice/edit/:id', async (req, res) => {
  try {
    const payload = req.body
    const {id} = req.params

    const updatedNotice = await Notices.findByIdAndUpdate({_id: id}, payload, {new: true})
    return res.status(200).json(updatedNotice)
  } catch (error) {
    console.log(error)
    return res.status(500).json({message: "Internal Server Error"})
  }
})

addNoticesRouter.delete('/notice/:id', isAuthenticatedMiddleware, async (req, res) => {
  const {id} = req.params
  try {
    await Notices.findByIdAndDelete({_id: id})
    return res.status(204).json({message: "Notice deleted succesfully"})
  } catch (error) {
    console.log(error)
    return res.status(500).json({message: "Internal Server Error"})
  }
})

export default addNoticesRouter