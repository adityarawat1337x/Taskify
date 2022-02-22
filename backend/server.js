const path = require("path")
const express = require("express")
const colors = require("colors")
const dotenv = require("dotenv").config()
const connectDB = require("./config/db")
const { taskErrorHandler } = require("./middlewares/errorMiddleware")
const cors = require("cors")

const port = process.env.PORT || 5000

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  optionSuccessStatus: 200,
}

connectDB()
const app = express()
app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/api/task", require("./routes/taskRoute"))
app.use("/api/user", require("./routes/userRoute"))

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")))
  app.get("*", (req, res) =>
    res.sendFile(
      path.resolve(__dirname, "../", "frontend", "build", "index.html")
    )
  )
} else {
  app.get("/", (req, res) => {
    res.send(
      "Hello from development... set your enviroment variable to production"
    )
  })
}

app.use(taskErrorHandler)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
