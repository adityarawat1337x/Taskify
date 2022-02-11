const mongoose = require("mongoose")

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "Please add a username"],
    },
    email: {
      type: String,
      require: [true, "Please add an email"],
      unique: [true, "Email already in use"],
    },
    password: {
      type: String,
      require: [true, "Please add a password"],
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model("User", userSchema)
