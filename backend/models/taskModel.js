const mongoose = require("mongoose")

const taskSchema = mongoose.Schema(
  {
    task: {
      type: String,
      required: [true, "Task is required"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "UserId is required"],
      ref: "User",
    },
  },
  { timestamps: true, strict: true }
)

module.exports = mongoose.model("Task", taskSchema)
