const { log } = require("console")
const { createServer } = require("http")
const {
  handeGetPeople,
  handleGetPerson,
  handleAddPerson,
  handleUpdatePerson,
  handleDeletePerson,
} = require("./controller/peopleController")

const { logger, errorHandler } = require("./middleware/peopleMiddleware")

const reg = {
  api: /^\/api\/people\/[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}$/,
  slashApi:
    /^\/api\/people\/[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}\/$/,
}

createServer()
  .on("request", (req, res) => {
    logger(req, res, (req, res) => {
      if (
        (req.url === "/api/people" || req.url === "/api/people/") &&
        req.method === "GET"
      ) {
        handeGetPeople(res)
      } else if (
        (req.url.match(reg.api) || req.url.match(reg.slashApi)) &&
        req.method === "GET"
      ) {
        handleGetPerson(req, res, (err, req, res) =>
          errorHandler(err, req, res)
        )
      } else if (
        (req.url === "/api/people" || req.url === "/api/people/") &&
        req.method === "POST"
      ) {
        handleAddPerson(req, res, (err, req, res) =>
          errorHandler(err, req, res)
        )
      } else if (
        (req.url.match(reg.api) || req.url.match(reg.slashApi)) &&
        req.method === "PUT"
      ) {
        handleUpdatePerson(req, res, (err, req, res) =>
          errorHandler(err, req, res)
        )
      } else if (
        (req.url.match(reg.api) || req.url.match(reg.slashApi)) &&
        req.method === "DELETE"
      ) {
        handleDeletePerson(req, res, (err, req, res) =>
          errorHandler(err, req, res)
        )
      } else {
        const err = new Error("Not found")
        err.status = 404
        errorHandler(err, req, res)
      }
    })
  })
  .listen(5000, () => log("Server running on port 5000"))
