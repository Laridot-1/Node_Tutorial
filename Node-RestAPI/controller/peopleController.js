const {
  getPeople,
  getPerson,
  addPerson,
  updatePerson,
  deletePerson,
} = require("../model/peopleModel.js")
const { getReqBody } = require("../utils.js")
const people = require("../people.json")

const handeGetPeople = async (res) => {
  const people = await getPeople()
  res.writeHead(200, { "Content-Type": "application/json" })
  res.end(JSON.stringify({ status: 200, data: people }))
}

const handleGetPerson = async (req, res, next) => {
  const id = req.url.match(
    /[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}/
  )[0]
  const person = await getPerson(id)

  if (!person) {
    const err = new Error(`Person with the id ${id} does not exist`)
    err.status = 404
    next(err, req, res)
  } else {
    res.writeHead(200, { "Content-Type": "application/json" })
    res.end(JSON.stringify({ status: 200, data: [person] }))
  }
}

const handleAddPerson = async (req, res, next) => {
  const body = await getReqBody(req)

  if (body?.name.trim() === "" || !body?.name || !body?.age) {
    const err = new Error("Please fill all fields")
    err.status = 400
    next(err, req, res)
  } else {
    const newPerson = await addPerson(body)
    res.writeHead(201, { "Content-Type": "application/json" })
    res.end(JSON.stringify(newPerson))
  }
}

const handleUpdatePerson = async (req, res, next) => {
  const body = await getReqBody(req)
  const id = req.url.match(
    /[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}/
  )[0]
  const person = people.find((p) => p.id === id)

  if (!person) {
    const err = new Error(`Person with the id ${id} does not exist`)
    err.status = 404
    next(err, req, res)
  } else {
    const updPerson = await updatePerson(body, person, id)
    res.writeHead(200, { "Content-Type": "application/json" })
    res.end(JSON.stringify(updPerson))
  }
}

const handleDeletePerson = async (req, res, next) => {
  const id = req.url.match(
    /[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}/
  )[0]
  const person = people.find((p) => p.id === id)

  if (!person) {
    const err = new Error(`Person with the id ${id} does not exist`)
    err.status = 404
    next(err, req, res)
  } else {
    await deletePerson(id)
    res.writeHead(200, { "Content-Type": "application/json" })
    res.end()
  }
}

module.exports = {
  handeGetPeople,
  handleGetPerson,
  handleAddPerson,
  handleUpdatePerson,
  handleDeletePerson,
}
