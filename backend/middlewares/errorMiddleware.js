const taskErrorHandler = (error, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500
  res.status(statusCode).json({
    message: error.message,
    stack: process.env.NODE_ENV === "production" ? undefined : error.stack,
  })
  next()
}

module.exports = { taskErrorHandler }
