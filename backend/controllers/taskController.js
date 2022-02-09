const expressAsyncHandler = require("express-async-handler")

//@desc get goals
//@route GET /api/task
//@access private
const getTasks = expressAsyncHandler(async (req, res) => {
  res.status(200).json({
    task: "My first Task",
  })
})

//@desc post goal
//@route POST /api/task
//@access private
const postTask = expressAsyncHandler(async (req, res) => {
  if (!req.body.task) {
    res.status(400)
    throw new Error()
  }
  res.status(200).json({
    task: "My first Task",
  })
})

//@desc udpdate goals private
//@route PUT /api/task/:id
//@access private
const putTask = expressAsyncHandler(async (req, res) => {
  res.status(200).json({
    task: "My first Task",
  })
})

//@desc delete goals private
//@route DELETE /api/task/:id
//@access private
const deleteTask = expressAsyncHandler(async (req, res) => {
  res.status(200).json({
    task: "My first Task",
  })
})
module.exports = { getTasks, putTask, postTask, deleteTask }
