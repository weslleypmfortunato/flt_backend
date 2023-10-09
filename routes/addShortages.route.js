import { Router } from "express"
import Shortages from '../models/Shortages.model.js'

const addShortagesRouter = Router()

addShortagesRouter.post('/shortages', async (req, res) => {
  const {materialName, materialQty, shortageRemark} = req.body

  try {
    const newShortage = await Shortages.create({materialName, materialQty, shortageRemark})

    if (newShortage) {
      return res.status(201).json({message: "Material added to shortage list succesfully"})
    }
  } catch (error) {
    console.log(error)
    return res.status(500).json({message: "Internal Server Error"})
  }
})

addShortagesRouter.get('/shortages', async (req, res) => {
  try {
    const shortageList = await Shortages.find().sort({materialName: 1})
    return res.status(200).json(shortageList)
  } catch (error) {
    console.log(error)
    return res.status(500).json({message: "Internal Server Error"})
  }
})

addShortagesRouter.get('/shortage/:id', async (req, res) => {
  try {
    const {id} = req.params
    const shortageId = await Shortages.findById(id)

    if (!shortageId) {
      return res.status(404).json({message: "Material not found"})
    }
    return res.status(200).json(shortageId)
  } catch (error) {
    console.log(error)
    return res.status(500).json({message: "Internal Server Error"})
  }
})

addShortagesRouter.put('/shortage/edit/:id', async (req, res) => {
  try {
    const payload = req.body
    const {id} = req.params

    const updateShortage = await Shortages.findByIdAndUpdate({_id: id}, payload, {new: true})
    return res.status(200).json(updateShortage)
  } catch (error) {
    console.log(error)
    return res.status(500).json({message: "Internal Server Error"})
  }
})

addShortagesRouter.delete('/shortage/:id', async (req, res) => {
  const {id} = req.params
  try {
    await Shortages.findByIdAndDelete({_id: id})
    return res.status(204).json({message: "Material deleted from shortage list succesfully"})
  } catch (error) {
    console.log(error)
    return res.status(500).json({message: "Internal Server Error"})
  }
})

export default addShortagesRouter