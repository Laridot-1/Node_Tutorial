import { model, Schema } from "mongoose"

const TaskSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please provide a name."],
    trim: true,
    maxlength: [20, "Name cannot be more than 20 characters."],
  },
  completed: {
    type: Boolean,
    default: false,
  },
})

const Task = model("Task", TaskSchema)

/*
===
GET
===

Task.find({}) // Get all
Task.find({queryKey: "queryValue"}) // Get specific
Task.find({}).limit(10) // Get all but limit the return value
Task.find({}).sort({docKey: 1}) // Get all and sort in ascending order
Task.find({}, {projection: {docKey: 1, _id: 0}}) // Get all but return some fields in each document
Task.findOne({}) // Match all but return the first one
Task.findOne({queryKey: "queryValue"}) // Match some but return the first one
Task.findOne({}, {projection: {docKey: 1, _id: 0}}) // Match some and return some fields in each document
*/

/*
===
PUT
===

Task.updateOne({queryKey: "queryValue"}, {$set: {newKey: "newValue"}})
Task.updateMany({queryKey: "queryValue"}, {$set: {newKey: "newValue"}})
*/

/*
======
DELETE
======

Task.deleteOne({queryKey: "queryValue"})
Task.deleteMany({queryKey: "queryValue"})
*/

/*
====
POST
====

Task.create({docKey: "docValue"})
*/

const getTasks = () => {
  return new Promise((resolve) => {
    const tasks = Task.find({})
    resolve(tasks)
  })
}

const getTask = (id) => {
  return new Promise((resolve) => {
    const task = Task.findOne({ _id: id })
    resolve(task)
  })
}

const createTask = (task) => {
  return new Promise((resolve) => {
    const newTask = Task.create(task)
    resolve(newTask)
  })
}

const updateTask = (id, task) => {
  return new Promise((resolve) => {
    const updatedTask = Task.findOneAndUpdate({ _id: id }, task, {
      new: true,
      runValidators: true,
    })
    resolve(updatedTask)
  })
}

const deleteTask = (id) => {
  return new Promise((resolve) => {
    const task = Task.findOneAndDelete({ _id: id })
    resolve(task)
  })
}

export { getTasks, getTask, createTask, updateTask, deleteTask }
