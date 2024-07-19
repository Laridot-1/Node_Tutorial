let people = require("../people.json")
const { randomUUID } = require("crypto")
const { writeToFile } = require("../utils")

const getPeople = () => {
  return new Promise((resolve) => {
    resolve(people)
  })
}

const getPerson = (id) => {
  return new Promise((resolve) => {
    const person = people.find((p) => p.id === id)
    resolve(person)
  })
}

const addPerson = (person) => {
  return new Promise((resolve) => {
    const newPerson = {
      id: randomUUID(),
      ...person,
    }
    people.push(newPerson)
    writeToFile(people)
    resolve(newPerson)
  })
}

const updatePerson = (body, person, id) => {
  return new Promise((resolve) => {
    const updPerson = {
      name: body?.name || person.name,
      age: body?.age || person.age,
      id,
    }
    people = people.map((p) => {
      if (p.id === id) {
        p.age = body?.age || p.age
        p.name = body?.name || p.name
      }
      return p
    })
    writeToFile(people)
    resolve(updPerson)
  })
}

const deletePerson = (id) => {
  return new Promise((resolve) => {
    people = people.filter((p) => p.id !== id)
    writeToFile(people)
  })
}

module.exports = {
  getPeople,
  getPerson,
  addPerson,
  updatePerson,
  deletePerson,
}
