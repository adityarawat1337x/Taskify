const expressAsyncHandler = require("express-async-handler")
const Task = require("../models/taskModel")
//@desc get goals
//@route GET /api/task
//@access private
const getTasks = expressAsyncHandler(async (req, res) => {
  const task = await Task.find()
  res.status(200).json(task)
})

//@desc post goal
//@route POST /api/task
//@access private
const postTask = expressAsyncHandler(async (req, res) => {
  if (!req.body.task) {
    res.status(400)
    throw new Error()
  }
  const task = await Task.create({ task: req.body.task })
  res.status(200).json(task)
})

//@desc udpdate goals private
//@route PUT /api/task/:id
//@access private
const putTask = expressAsyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id)

  if (!task) {
    res.status(404)
    throw new Error("Task not found")
  }

  const updatedTask = await Task.findByIdAndUpdate(
    req.params.id,
    { task: req.body.task },
    { new: true }
  )

  res.status(200).json(updatedTask)
})

//@desc delete goals private
//@route DELETE /api/task/:id
//@access private
const deleteTask = expressAsyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id)

  if (!task) {
    res.status(404)
    throw new Error("Task not found")
  }
  const deleteTask = task
  await task.remove()

  res.status(200).json(deleteTask)
})

module.exports = { getTasks, putTask, postTask, deleteTask }
