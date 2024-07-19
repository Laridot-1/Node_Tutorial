import { asyncWrapper } from "../middleware/taskMiddleware.js"
import {
  handleCreateTask,
  handleDeleteTask,
  handleGetTask,
  handleGetTasks,
  handleUpdateTask,
} from "../controllers/tasksControllers.js"

import express from "express"

const Router = express.Router()

Router.route("/")
  .get((req, res, next) => asyncWrapper(handleGetTasks)(req, res, next))
  .post((req, res, next) => asyncWrapper(handleCreateTask)(req, res, next))

Router.route("/:id")
  .get((req, res, next) => asyncWrapper(handleGetTask)(req, res, next))
  .patch((req, res, next) => asyncWrapper(handleUpdateTask)(req, res, next))
  .delete((req, res, next) => asyncWrapper(handleDeleteTask)(req, res, next))

export default Router
