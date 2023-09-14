import "dotenv/config"
import cors from 'cors'
import express from 'express'
import connectDB from "./config/db.connection.js"
import employeesListRouter from "./routes/employeesList.routes.js"
import addProductsRouter from "./routes/addProduct.routes.js"
import authRouter from "./routes/auth.routes.js"
import bomRouter from "./routes/productBom.routes.js"

const app = express()
connectDB()

app.use(cors({ origin: process.env.REACT_URL }))
app.options("*", cors())
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  app.use(cors())
  next()
})

app.use(express.json())
app.use(authRouter)
app.use(employeesListRouter)
app.use(addProductsRouter)
app.use(bomRouter)


app.get('/test', (req, res) => {
  res.send('API working properly')
}) 

app.listen(process.env.PORT || 3001, () => console.log('Server listening on port: ', process.env.PORT || 3001))