import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import taskService from "./taskService"

const initialState = {
  tasks: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
}

//?Create task

export const createTask = createAsyncThunk(
  "task/create",
  async (data, thunkAPI) => {
    try {
      const response = await taskService.createTask(data)
      return response
    } catch (error) {
      const message =
        (error &&
          error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.error ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

//?Get task

export const getTasks = createAsyncThunk("task/get", async (user, thunkAPI) => {
  try {
    const response = await taskService.getTasks(user)
    return response
  } catch (error) {
    const message =
      (error &&
        error.response &&
        error.response.data &&
        error.response.data.message) ||
      error.message ||
      error.error ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

//?Update task

export const updateTask = createAsyncThunk(
  "task/update",
  async (task, thunkAPI) => {
    try {
      const response = await taskService.updateTask(task)
      return response
    } catch (error) {
      const message =
        (error &&
          error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.error ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

//?Delete task

export const deleteTask = createAsyncThunk(
  "task/delete",
  async (task, thunkAPI) => {
    try {
      const response = await taskService.deleteTask(task)
      return response
    } catch (error) {
      const message =
        (error &&
          error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.error ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false
      state.isError = false
      state.isSuccess = false
      state.message = ""
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createTask.pending, (state) => {
      state.isLoading = true
      state.isError = false
      state.isSuccess = false
      state.message = ""
    })
    builder.addCase(createTask.fulfilled, (state, action) => {
      state.isLoading = false
      state.isError = false
      state.isSuccess = true
      state.message = action.payload.message
    })
    builder.addCase(createTask.rejected, (state, action) => {
      state.isLoading = false
      state.isError = true
      state.isSuccess = false
      state.message = action.payload
    })
    builder.addCase(getTasks.pending, (state) => {
      state.isLoading = true
      state.isError = false
      state.isSuccess = false
      state.message = ""
    })
    builder.addCase(getTasks.fulfilled, (state, action) => {
      state.isLoading = false
      state.isError = false
      state.isSuccess = true
      state.tasks = action.payload
    })
    builder.addCase(getTasks.rejected, (state, action) => {
      state.isLoading = false
      state.isError = true
      state.isSuccess = false
      state.message = action.payload
    })
    builder.addCase(updateTask.pending, (state) => {
      state.isLoading = true
      state.isError = false
      state.isSuccess = false
      state.message = ""
    })
    builder.addCase(updateTask.fulfilled, (state, action) => {
      state.isLoading = false
      state.isError = false
      state.isSuccess = true
      state.message = action.payload
    })
    builder.addCase(updateTask.rejected, (state, action) => {
      state.isLoading = false
      state.isError = true
    })
  },
})

export const { reset } = taskSlice.actions
export default taskSlice.reducer
