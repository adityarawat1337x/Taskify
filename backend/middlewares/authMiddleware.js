const expressAsyncHandler = require("express-async-handler")
const jwt = require("jsonwebtoken")
const User = require("../models/userModel")

const protect = expressAsyncHandler(async (req, res, next) => {
  let token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer") //? check if token exists
  ) {
    try {
      //? get token from header
      token = req.headers.authorization.split(" ")[1]

      //?verify token valid
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET)

      //?send data back
      req.user = await User.findById(decodedToken.id).select("-password")
      next()
    } catch (err) {
      res.status(401)
      throw new Error(err, "Not authorized")
    }
  }

  if (!token) {
    res.status(401)
    throw new Error("Not authorized, No token Found")
  }
})

module.exports = protect
