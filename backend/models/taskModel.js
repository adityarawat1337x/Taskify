const mongoose = require("mongoose")

const taskSchema = mongoose.Schema(
  {
    task: {
      type: String,
      required: [true, "Task is required"],
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model("Task", taskSchema)
