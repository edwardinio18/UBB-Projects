const Cigarette = require("../models/cigarette.model.js");
const db = require("../database/cigarette.database.js");

var cigarettes = [];

module.exports = {
  genCigs: function () {
    cigarettes = [];

    let c1 = new Cigarette({
      id: 1,
      name: "Sobranie Blue",
      price: 25,
      origin: "Russia",
      photo:
        "https://www.cigarettesshop.net/images/2018/11/13/20181113100001-1.jpg",
      description:
        "Sobranie Blue is a brand of cigarettes produced by Imperial Tobacco in the United Kingdom. The brand was first introduced in 1902 and was the first cigarette brand to be advertised on television in 1955. The brand is currently owned by British American Tobacco.",
      brand: 1,
    });
    let c2 = new Cigarette({
      id: 2,
      name: "Winston Caster",
      price: 20,
      origin: "USA",
      photo:
        "https://www.cigarettesshop.net/images/2018/11/13/20181113100001-1.jpg",
      description:
        "Winston Caster is a brand of cigarettes produced by R.J. Reynolds Tobacco Company. The brand was first introduced in 1954 and was the first cigarette brand to be advertised on television in 1955. The brand is currently owned by British American Tobacco.",
      brand: 2,
    });
    let c3 = new Cigarette({
      id: 3,
      name: "Marlboro Red",
      price: 21,
      origin: "USA",
      photo:
        "https://www.cigarettesshop.net/images/2018/11/13/20181113100001-1.jpg",
      description:
        "Marlboro Red is a brand of cigarettes produced by Imperial Tobacco in the United Kingdom. The brand was first introduced in 1902 and was the first cigarette brand to be advertised on television in 1955. The brand is currently owned by British American Tobacco.",
      brand: 3,
    });
    let c4 = new Cigarette({
      id: 4,
      name: "L&M Blue Label Box",
      price: 22,
      origin: "L&M",
      photo:
        "https://www.cigarettesshop.net/images/2018/11/13/20181113100001-1.jpg",
      description:
        "L&M is a brand of cigarettes produced by R.J. Reynolds Tobacco Company. The brand was first introduced in 1954 and was the first cigarette brand to be advertised on television in 1955. The brand is currently owned by British American Tobacco.",
      brand: 4,
    });
    let c5 = new Cigarette({
      id: 5,
      name: "Kent Core Short",
      price: 23,
      origin: "Kent",
      photo:
        "https://www.cigarettesshop.net/images/2018/11/13/20181113100001-1.jpg",
      description:
        "Kent is a brand of cigarettes produced by Imperial Tobacco in the United Kingdom. The brand was first introduced in 1902 and was the first cigarette brand to be advertised on television in 1955. The brand is currently owned by British American Tobacco.",
      brand: 5,
    });
    let c6 = new Cigarette({
      id: 6,
      name: "Pall Mall Pink Slim",
      price: 25,
      origin: "UK",
      photo:
        "https://www.cigarettesshop.net/images/2018/11/13/20181113100001-1.jpg",
      description:
        "Pall Mall Pink SLim is a brand of cigarettes produced by Imperial Tobacco in the United Kingdom. The brand was first introduced in 1902 and was the first cigarette brand to be advertised on television in 1955. The brand is currently owned by British American Tobacco.",
      brand: 9,
    });
    let c7 = new Cigarette({
      id: 7,
      name: "Lucky Strike Red",
      price: 20,
      origin: "USA",
      photo:
        "https://www.cigarettesshop.net/images/2018/11/13/20181113100001-1.jpg",
      description:
        "Lucky Strike Red is a brand of cigarettes produced by R.J. Reynolds Tobacco Company. The brand was first introduced in 1954 and was the first cigarette brand to be advertised on television in 1955. The brand is currently owned by British American Tobacco.",
      brand: 7,
    });
    let c8 = new Cigarette({
      id: 8,
      name: "Camel Blue",
      price: 21,
      origin: "USA",
      photo:
        "https://www.cigarettesshop.net/images/2018/11/13/20181113100001-1.jpg",
      description:
        "Camel Blue is a brand of cigarettes produced by Imperial Tobacco in the United Kingdom. The brand was first introduced in 1902 and was the first cigarette brand to be advertised on television in 1955. The brand is currently owned by British American Tobacco.",
      brand: 6,
    });
    let c9 = new Cigarette({
      id: 9,
      name: "Dunhill Evoque",
      price: 22,
      origin: "UK",
      photo:
        "https://www.cigarettesshop.net/images/2018/11/13/20181113100001-1.jpg",
      description:
        "Dunhill is a brand of cigarettes produced by R.J. Reynolds Tobacco Company. The brand was first introduced in 1954 and was the first cigarette brand to be advertised on television in 1955. The brand is currently owned by British American Tobacco.",
      brand: 8,
    });
    let c10 = new Cigarette({
      id: 10,
      name: "Rothmans Purple",
      price: 23,
      origin: "UK",
      photo:
        "https://www.cigarettesshop.net/images/2018/11/13/20181113100001-1.jpg",
      description:
        "Rothmans Purple is a brand of cigarettes produced by Imperial Tobacco in the United Kingdom. The brand was first introduced in 1902 and was the first cigarette brand to be advertised on television in 1955. The brand is currently owned by British American Tobacco.",
      brand: 10,
    });

    cigarettes.push(c1);
    cigarettes.push(c2);
    cigarettes.push(c3);
    cigarettes.push(c4);
    cigarettes.push(c5);
    cigarettes.push(c6);
    cigarettes.push(c7);
    cigarettes.push(c8);
    cigarettes.push(c9);
    cigarettes.push(c10);

    cigarettes.forEach((cig) => {
      db.add(cig);
    });
  },

  getCigs: async function (page, pageSize) {
    if (page == -1 && pageSize == -1) {
      return await db.getAll(page, pageSize);
    }

    const { results, pageInfo } = await db.getAll(page, pageSize);
    cigarettes = results;
    return {
      cigarettes,
      pageInfo,
    };
  },

  getIDCigs: async function (id) {
    return await db.getByID(id);
  },

  createCigs: function (id, name, price, origin, photo, description, brand) {
    let newCig = new Cigarette({
      id: id,
      name: name,
      price: price,
      origin: origin,
      photo: photo,
      description: description,
      brand: brand,
    });
    db.add(newCig);
  },

  updateCigs: function (id, name, price, origin, photo, description, brand) {
    let newCig = new Cigarette({
      id: id,
      name: name,
      price: price,
      origin: origin,
      photo: photo,
      description: description,
      brand: brand,
    });
    db.update(newCig);
  },

  deleteCigs: function (id) {
    db.delete(id);
  },

  updateBrandCigsMany: async function (id, cigs) {
    return await db.updateMany(id, cigs);
  },

  filter: async function (price, page, pageSize) {
    const { results, pageInfo } = await db.filter(price, page, pageSize);
    cigarettes = results;
    return {
      cigarettes,
      pageInfo,
    };
  },

  getMaxID: async function () {
    return await db.getMaxID();
  }
};
