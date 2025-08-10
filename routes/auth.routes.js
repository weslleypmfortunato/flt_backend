import { Router } from 'express'
import bcrypt from 'bcryptjs'
import User from '../models/User.model.js'
import 'dotenv/config'
import jwt from 'jsonwebtoken'
import isAuthenticatedMiddleware from '../middlewares/isAuthenticatedMiddleware.js'

const authRouter = Router()

// authRouter.post('/auth/sign-up/user', isAuthenticatedMiddleware, async (req, res) => {
//   const {name, level, password, department, comments, dob, phoneNumber, position, startingDate, emergencyContact} = req.body

//   try {
//     const userExists = await User.findOne({name})
//     if (userExists) {
//       throw new Error('Employee name already registered')
//     }
//     const salt = bcrypt.genSaltSync(+process.env.SALT_ROUNDS)
//     const passwordHash = bcrypt.hashSync(password, salt)

//     const newUser = await User.create({name, level, passwordHash, department, comments, dob, phoneNumber, position, startingDate, emergencyContact})

//     if (newUser) {
//       return res.status(201).json({message: "User create succesfully"})
//     }
//   } catch (error) {
//     console.log(error)

//     if (error.message === 'Employee name already registered') {
//       return res.status(409).json({message: "Check inputted data"})
//     }
//     return res.status(500).json({message: "Internal Server Error"})
//   }
// })

authRouter.post('/auth/sign-up/first-user', async (req, res) => {
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

authRouter.get('/user/:id', isAuthenticatedMiddleware, async (req, res) => {
  try {
    const {id} = req.params
    const userId = await User.findById(id).select({passwordHash: 0})

    if (!userId) {
      return res.status(404).json({message: "User not found"})
    }
    return res.status(200).json(userId)
  } catch (error) {
    console.log(error)
    return res.status(500).json({message: "Internal Server Error"})
  }
})

authRouter.put('/user/edit/:id', async (req, res) => {
  try {
    const payload = req.body
    const {id} = req.params

    const updateUser = await User.findByIdAndUpdate({_id: id}, payload, {new: true})
    return res.status(200).json(updateUser)
  } catch (error) {
    console.log(error)
    return res.status(500).json({message: "Internal Server Error"})
  }
})

authRouter.delete('/user/:id', isAuthenticatedMiddleware, async (req, res) => {
  const {id} = req.params
  try {
    await User.findByIdAndDelete({_id: id})
    return res.status(204).json({message: "User deleted succesfully"})
  } catch (error) {
    console.log(error)
    return res.status(500).json({message: "Internal Server Error"})
  }
})

authRouter.post('/auth/login', async (req, res) => {
  const {name, password} = req.body

  try {
    const user = await User.findOne({name})

    if (!user) {
      throw new Error('Employee name does not exist')
    }

    if (!bcrypt.compareSync(password, user.passwordHash)) {
      return res.status(401).json({message: "Invalid Password"})
    }

    const expiresIn = 86400
    const secret = process.env.JWT_SECRET

    const token = jwt.sign({ id: user._id, name: user.name}, secret, {expiresIn})
    return res.status(200).json({ user: { id: user._id, name, level: user.level}, logged: true, jwt: token})
  } catch (error) {
    console.log(error)
    return res.status(401).json({message: "Employee name does not exist"})
  }
})

export default authRouter