const express = require("express");
const { taskErrorHandler } = require("./middlewares/errorMiddleware");
const dotenv = require("dotenv").config();
const port = process.env.PORT || 8000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/task", require("./routes/taskRoute"));
app.use(taskErrorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
