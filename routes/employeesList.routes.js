import { Router } from "express"
import User from '../models/User.model.js'
import 'dotenv/config'

const employeesListRouter = Router()

employeesListRouter.get('/users', async (req, res) => {

  try {
    const employeesList = await User.find({currentStatus: false}).sort({name: 1}).select({passwordHash: 0})
    return res.status(200).json(employeesList)
  } catch (error) {
    console.log(error)
    return res.status(500).json({message: "Internal Server Error"})
  }
})

employeesListRouter.get('/former-emplyees', async (req, res) => {

  try {
    const formerEmployeeList = await User.find({currentStatus: true}).sort({name: 1}).select({passwordHash: 0})
    return res.status(200).json(formerEmployeeList)
  } catch (error) {
    console.log(error)
    return res.status(500).json({message: "Internal Server Error"})
  }
})

export default employeesListRouter