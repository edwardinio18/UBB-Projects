const Person = require("../models/person.model.js");
const db = require("../database/person.database.js");

var people = [];

module.exports = {
  genPeople: function () {
    people = [];

    let p1 = new Person({
      id: 1,
      name: "Iakabu",
      age: 21,
      email: "edwardiakab@yahoo.com",
      phone: "0729364643",
      address: "Fierului 33",
    });
    let p2 = new Person({
      id: 2,
      name: "Cristina",
      age: 21,
      email: "cristinahognogi04@gmail.com",
      phone: "0723195823",
      address: "Fierului 33",
    });
    let p3 = new Person({
      id: 3,
      name: "Mihai",
      age: 25,
      email: "mihaita012@gmail.com",
      phone: "0739284918",
      address: "Unirii 4",
    });
    let p4 = new Person({
      id: 4,
      name: "Andreea",
      age: 30,
      email: "anddreeo101@outlook.com",
      phone: "0722993832",
      address: "Campului 2",
    });
    let p5 = new Person({
      id: 5,
      name: "Maria",
      age: 18,
      email: "mmmariaaa150@yahoo.com",
      phone: "0799827738",
      address: "Galati 98",
    });
    let p6 = new Person({
      id: 6,
      name: "Ion",
      age: 22,
      email: "ionionescu@yahoo.com",
      phone: "0734193829",
      address: "Motilor 7",
    });
    let p7 = new Person({
      id: 7,
      name: "Ghita",
      age: 40,
      email: "ghitalica@gmail.com",
      phone: "0742670680",
      address: "Pallady 89",
    });
    let p8 = new Person({
      id: 8,
      name: "Ioana",
      age: 12,
      email: "ioanamica@outlook.com",
      phone: "0722888999",
      address: "Aurel Vlaicu 3",
    });
    let p9 = new Person({
      id: 9,
      name: "Mircea",
      age: 35,
      email: "mirculica123@gmail.com",
      phone: "0722938938",
      address: "Dorobantilor 90",
    });
    let p10 = new Person({
      id: 10,
      name: "Georgiana",
      age: 1,
      email: "gggeorgiana955@yahoo.com",
      phone: "0799789999",
      address: "Muresului 83",
    });

    people.push(p1);
    people.push(p2);
    people.push(p3);
    people.push(p4);
    people.push(p5);
    people.push(p6);
    people.push(p7);
    people.push(p8);
    people.push(p9);
    people.push(p10);

    people.forEach((person) => {
      db.add(person);
    });
  },

  getPeople: async function (page, pageSize) {
    if (page == -1 && pageSize == -1) {
      return await db.getAll(page, pageSize);
    }

    const { results, pageInfo } = await db.getAll(page, pageSize);
    people = results;

    return {
      people,
      pageInfo,
    };
  },

  getIDPeople: async function (id) {
    return await db.getByID(id);
  },

  createPeople: function (id, name, age, email, phone, address) {
    let newPerson = new Person({
      id: id,
      name: name,
      age: age,
      email: email,
      phone: phone,
      address: address,
    });
    db.add(newPerson);
  },

  updatePeople: function (id, name, age, email, phone, address) {
    let idx = people.findIndex((person) => person.id == id);
    id = parseInt(id);

    people[idx] = {
      id: id,
      name: name,
      age: age,
      email: email,
      phone: phone,
      address: address,
    };

    db.update(people[idx]);
  },

  deletePeople: function (id) {
    db.delete(id);
  },

  getMaxID: async function () {
    return await db.getMaxID();
  },
};
