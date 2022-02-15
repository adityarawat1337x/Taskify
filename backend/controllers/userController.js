const expressAsyncHandler = require("express-async-handler")
const User = require("../models/userModel")
const Task = require("../models/taskModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

//*@desc add new user
//*@route POST /api/user/register
//*@access public

const addUser = expressAsyncHandler(async (req, res) => {
  //? check if all values are present (validation done on frontend)
  const { name, email, password } = req.body
  if (!name || !email || !password) {
    res.status(400)
    throw new Error("Please add all fields")
  }

  //? check if user already exists
  const user = await User.findOne({ email })
  if (user) {
    res.status(400)
    throw new Error("User already Exists")
  }
  //? hash the password
  const salt = await bcrypt.genSalt(10)
  const hashedPass = await bcrypt.hash(password, salt)

  //? create user
  const newUser = await User.create({
    name,
    email,
    password: hashedPass,
  })

  if (newUser) {
    res.status(201).json({
      _id: newUser.id,
      name: newUser.name,
      token: genToken(newUser.id),
    })
  } else {
    res.status(400)
    throw new Error("User creation failed")
  }
})

//*@desc login a user
//*@route POST /api/user/login
//*@access public

const loginUser = expressAsyncHandler(async (req, res) => {
  //? check if all values are present (validation done on frontend)
  const { email, password } = req.body
  if (!email || !password) {
    res.status(400)
    throw new Error("Please add all fields")
  }

  const user = await User.findOne({ email })

  //? check if user exists

  if (user && (await bcrypt.compare(password, user.password)))
    return res
      .status(200)
      .json({ _id: user.id, name: user.name, token: genToken(user.id) })

  res.status(400)
  throw new Error("Invalid credentials")
})

//!@desc get jwt user
//!@route GET /api/user/me
//!@access private

const getUser = expressAsyncHandler(async (req, res) => {
  res.status(200).json(req.user)
})

//!@desc delete jwt user
//!@route DELETE /api/user/me/delete
//!@access private

const deleteUser = expressAsyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
  const tasks = await Task.find({ user: req.user._id })
  tasks.map((task) => task.delete())
  user.delete()
  res.status(200).json(user)
})

//TODO: //!@desc update jwt user
//!@route PUT /api/user/me/update
//!@access private

const updateUser = expressAsyncHandler(async (req, res) => {
  res.status(200).json({
    mesage: "update current user",
  })
})

//* generate jwt token
const genToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  })

module.exports = { addUser, loginUser, deleteUser, updateUser, getUser }
