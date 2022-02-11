const expressAsyncHandler = require("express-async-handler")
const Task = require("../models/taskModel")
const User = require("../models/userModel")

//!@desc get task
//!@route GET /api/task
//!@access private
const getTasks = expressAsyncHandler(async (req, res) => {
  const task = await Task.find({ user: req.user._id })
  res.status(200).json(task)
})

//!@desc post task
//!@route POST /api/task
//!@access private
const postTask = expressAsyncHandler(async (req, res) => {
  if (!req.body.task) {
    res.status(400)
    throw new Error("Add Task")
  }

  // const task = await Task.find({ task: req.body.task })

  // if (task) {
  //   res.status(400)
  //   throw new Error(task, "Task Exists")
  // }

  const newTask = await Task.create({ task: req.body.task, user: req.user._id })
  res.status(200).json(newTask)
})

//!@desc udpdate task
//!@route PUT /api/task/:id
//!@access private
const putTask = expressAsyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id)
  const user = await User.findById(req.user.id)

  if (!task) {
    res.status(404)
    throw new Error("Task not found")
  }

  if (user._id.toString !== task.user) {
    res.status(401)
    throw new Error("Unauthorized")
  }

  const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })

  res.status(200).json(updatedTask)
})

//!@desc delete task
//!@route DELETE /api/task/:id
//!@access private
const deleteTask = expressAsyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id)
  const user = await User.findById(req.user.id)

  if (!task) {
    res.status(404)
    throw new Error("Task not found")
  }

  if (user._id.toString !== task.user) {
    res.status(401)
    throw new Error("Unauthorized")
  }

  task.delete()
  res.status(200).json(task)
})

module.exports = { getTasks, putTask, postTask, deleteTask }
