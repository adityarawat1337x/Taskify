const express = require("express")
const colors = require("colors")
const { taskErrorHandler } = require("./middlewares/errorMiddleware")
const dotenv = require("dotenv").config()
const connectDB = require("./config/db")
const port = process.env.PORT || 8000
connectDB()
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/api/task", require("./routes/taskRoute"))
app.use(taskErrorHandler)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
