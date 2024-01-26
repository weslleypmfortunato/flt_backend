import "dotenv/config"
import cors from 'cors'
import express from 'express'
import connectDB from "./config/db.connection.js"
import employeesListRouter from "./routes/employeesList.routes.js"
import addOrdersRouter from "./routes/addOrders.routes.js"
import authRouter from "./routes/auth.routes.js"
import addShortagesRouter from "./routes/addShortages.routes.js"
import addNoticesRouter from "./routes/addNotices.routes.js"
import addNCRRouter from "./routes/addNCR.routes.js"

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
app.use(addOrdersRouter)
app.use(addShortagesRouter)
app.use(addNoticesRouter)
app.use(addNCRRouter)


app.get('/test', (req, res) => {
  res.send('API working properly')
}) 

app.listen(process.env.PORT || 3001, () => console.log('Server listening on port: ', process.env.PORT || 3001))