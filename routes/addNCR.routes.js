import { Router } from "express";
import NCR from "../models/NCR.model.js";
import 'dotenv/config'
import isAuthenticatedMiddleware from "../middlewares/isAuthenticatedMiddleware.js";

const addNCRRouter = Router()

// addNCRRouter.post('/ncr/new', isAuthenticatedMiddleware, async (req, res) => {
//   const { title, reference, creator, location, description, ncrDate, causeOfNcr, closeOutDate, reasonForClosure, latestDisposition, closer } = req.body

//   try {
//     const newNCR = await NCR.create({ title, reference, creator, location, description, ncrDate, causeOfNcr, closeOutDate, reasonForClosure, latestDisposition, closer })

//     if (newNCR) {
//       return res.status(201).json({message: "NCR created succesfully"})
//     }
//   } catch (error) {
//     console.log(error)
//     return res.status(500).json({message: "Internal server error"})
//   }
// })

addNCRRouter.post('/auth/sign-up/first-user', async (req, res) => {
  const {name, level, password, department, comments, dob, phoneNumber, position, startingDate, emergencyContact} = req.body

  try {
    const userCount = await User.countDocuments()
    if (userCount > 0) {
      return res.status(403).json({message: 'First user already created'})
    }

    const salt = bcrypt.genSaltSync(+process.env.SALT_ROUNDS)
    const passwordHash = bcrypt.hashSync(password, salt)

    const newUser = await User.create({name, level, passwordHash, department, comments, dob, phoneNumber, position, startingDate, emergencyContact})

    if (newUser) {
      return res.status(201).json({message: "First user created successfully"})
    }
  } catch (error) {
    console.log(error)
    return res.status(500).json({message: "Internal Server Error"})
  }
})

addNCRRouter.get('/ncr', isAuthenticatedMiddleware, async (req, res) => {

  try {
    // const ncrList = await NCR.find().sort({priority: 1})
    // const ncrList = await NCR.find().sort({ncrDate: 1})
    const ncrList = await NCR.find().sort({createdAt: 1})
    return res.status(200).json(ncrList)
  } catch (error) {
    console.log(error)
    return res.status(500).json({message: "Internal server error"})
  }
})

addNCRRouter.get('/ncr/:id', isAuthenticatedMiddleware, async (req, res) => {
  try {
    const {id} = req.params
    const ncrId = await NCR.findById(id)

    if (!ncrId) {
      return res.status(404).json({message: "NCR not found."})
    }
    return res.status(200).json(ncrId)
  } catch (error) {
    console.log(error)
    return res.status(500).json({message: "Internal server error"})
  }
})

addNCRRouter.put('/ncr/edit/:id', async (req, res) => {
  try {
    const payload = req.body
    const {id} = req.params

    console.log("Payload recebido no update:", payload) // <-- ADICIONAR ISSO

    const updateNcr = await NCR.findByIdAndUpdate({_id: id}, payload, {new: true})
    return res.status(200).json(updateNcr)
  } catch (error) {
    console.log(error)
    return res.status(500).json({message: "Internal server error"})
  }
})

addNCRRouter.delete('/ncr/:id', isAuthenticatedMiddleware, async (req, res) => {
  const {id} = req.params
  try {
    await NCR.findByIdAndDelete({_id: id})
    return res.status(204).json({message: "NCR deleted succesfully"})
  } catch (error) {
    console.log(error)
    return res.status(500).json({message: "Internal server error"})
  }
})

addNCRRouter.put('/ncr/updateDeleteStatus/:id', isAuthenticatedMiddleware, async (req, res) => {
  try {
    const { id } = req.params
    const { deleteStatus } = req.body

    const updatedNcr = await NCR.findByIdAndUpdate(id, { deleteStatus }, { new: true })
    if (!updatedNcr) {
      return res.status(404).json({ message: "NCR not found." })
    }
    return res.status(200).json(updatedNcr)
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" })
  }
})

export default addNCRRouter