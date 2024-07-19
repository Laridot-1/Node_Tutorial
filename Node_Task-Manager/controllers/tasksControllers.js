import {
  createTask,
  deleteTask,
  getTask,
  getTasks,
  updateTask,
} from "../models/taskModel.js"

const handleGetTasks = async (req, res, next) => {
  const tasks = await getTasks()
  res.status(200).json({ tasks, length: tasks.length })
}

const handleGetTask = async (req, res, next) => {
  const task = await getTask(req.params.id)
  if (task) {
    res.status(200).json({ task })
  } else {
    const err = new Error(`No task with the id: ${req.params.id}`)
    err.status = 404
    next(err)
  }
}

const handleCreateTask = async (req, res, next) => {
  // const newTask = new Task(req.body)

  const newTask = await createTask(req.body)
  res.status(201).json({ task: newTask })
}

const handleUpdateTask = async (req, res, next) => {
  const task = await updateTask(req.params.id, req.body)
  if (task) {
    res.status(200).json({ task })
  } else {
    const err = new Error(`No task with the id: ${req.params.id}`)
    err.status = 404
    next(err)
  }
}

const handleDeleteTask = async (req, res, next) => {
  const task = await deleteTask(req.params.id)
  if (task) {
    res.status(200).json({ task })
  } else {
    const err = new Error(`No task with the id: ${req.params.id}`)
    err.status = 404
    next(err)
  }
}

export {
  handleGetTasks,
  handleGetTask,
  handleCreateTask,
  handleUpdateTask,
  handleDeleteTask,
}
