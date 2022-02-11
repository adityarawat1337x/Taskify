const expressAsyncHandler = require("express-async-handler")
const Task = require("../models/taskModel")

//!@desc get task
//!@route GET /api/task
//!@access private
const getTasks = expressAsyncHandler(async (req, res) => {
  const task = await Task.find({ user: req.user.id })
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

  const task = await Task.find({ task: req.body.task })
  if (task) {
    res.status(400)
    throw new Error("Task Exists")
  }

  const newTask = await Task.create({ task: req.body.task, user: req.user._id })
  res.status(200).json(newTask)
})

//!@desc udpdate task
//!@route PUT /api/task/:id
//!@access private
const putTask = expressAsyncHandler(async (req, res) => {
  const task = await Task.findone({ _id: req.params.id, user: req.user.id })
  if (!task) {
    res.status(404)
    throw new Error("Task not found")
  }

  const updatedTask = await Task.findByIdAndUpdate(
    req.params.id,
    { ...task, task: req.body.task },
    { new: true }
  )

  res.status(200).json(updatedTask)
})

//!@desc delete task
//!@route DELETE /api/task/:id
//!@access private
const deleteTask = expressAsyncHandler(async (req, res) => {
  const task = await Task.findOne({
    user: req.user.id,
    _id: req.params.id,
  })

  if (!task) {
    res.status(404)
    throw new Error("Task not found")
  }
  task.delete()
  res.status(200).json(task)
})

module.exports = { getTasks, putTask, postTask, deleteTask }
