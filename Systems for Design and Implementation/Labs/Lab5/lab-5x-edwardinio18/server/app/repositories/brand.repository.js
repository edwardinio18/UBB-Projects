const Brand = require("../models/brand.model.js");
const Cigarette = require("../models/cigarette.model.js");

const db = require("../database/brand.database.js");
const dbCig = require("../database/cigarette.database.js");

var brands = [];

module.exports = {
  genBrands: async function () {
    brands = [];

    let b1 = new Brand({
      id: 1,
      name: "Sobranie",
      origin: "Russia",
      description:
        "Sobranie is a brand of cigarettes produced by Imperial Tobacco in Russia. The brand was founded in 1879 by Pyotr A. Izmaylov, a Russian tobacco merchant, and was named after the Russian word for 'collection'.",
      noCountries: 100,
      photo:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Sobranie_White_Russian.jpg/220px-Sobranie_White_Russian.jpg",
    });
    let b2 = new Brand({
      id: 2,
      name: "Winston",
      origin: "USA",
      description:
        "Winston is a brand of cigarettes produced by R.J. Reynolds Tobacco Company. The brand was first introduced in 1954 and was the first cigarette brand to be advertised on television in 1955. The brand is currently owned by British American Tobacco.",
      noCountries: 65,
      photo:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Winston.jpg/220px-Winston.jpg",
    });
    let b3 = new Brand({
      id: 3,
      name: "Marlboro",
      origin: "USA",
      description:
        "Marlboro is a brand of cigarettes produced by Imperial Tobacco in the United Kingdom. The brand was first introduced in 1902 and was the first cigarette brand to be advertised on television in 1955. The brand is currently owned by British American Tobacco.",
      noCountries: 80,
      photo:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Marlboro.jpg/220px-Marlboro.jpg",
    });
    let b4 = new Brand({
      id: 4,
      name: "L&M",
      origin: "USA",
      description:
        "L&M is a brand of cigarettes produced by Imperial Tobacco in the United Kingdom. The brand was first introduced in 1902 and was the first cigarette brand to be advertised on television in 1955. The brand is currently owned by British American Tobacco.",
      noCountries: 75,
      photo:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/L&M.jpg/220px-L&M.jpg",
    });
    let b5 = new Brand({
      id: 5,
      name: "Kent",
      origin: "USA",
      description:
        "Kent is a brand of cigarettes produced by Imperial Tobacco in the United Kingdom. The brand was first introduced in 1902 and was the first cigarette brand to be advertised on television in 1955. The brand is currently owned by British American Tobacco.",
      noCountries: 90,
      photo:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Kent.jpg/220px-Kent.jpg",
    });
    let b6 = new Brand({
      id: 6,
      name: "Camel",
      origin: "USA",
      description:
        "Camel is a brand of cigarettes produced by Imperial Tobacco in the United Kingdom. The brand was first introduced in 1902 and was the first cigarette brand to be advertised on television in 1955. The brand is currently owned by British American Tobacco.",
      noCountries: 85,
      photo:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Camel.jpg/220px-Camel.jpg",
    });
    let b7 = new Brand({
      id: 7,
      name: "Lucky Strike",
      origin: "USA",
      description:
        "Lucky Strike is a brand of cigarettes produced by Imperial Tobacco in the United Kingdom. The brand was first introduced in 1902 and was the first cigarette brand to be advertised on television in 1955. The brand is currently owned by British American Tobacco.",
      noCountries: 70,
      photo:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Lucky_Strike.jpg/220px-Lucky_Strike.jpg",
    });
    let b8 = new Brand({
      id: 8,
      name: "Dunhill",
      origin: "USA",
      description:
        "Dunhill is a brand of cigarettes produced by Imperial Tobacco in the United Kingdom. The brand was first introduced in 1902 and was the first cigarette brand to be advertised on television in 1955. The brand is currently owned by British American Tobacco.",
      noCountries: 60,
      photo:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Dunhill.jpg/220px-Dunhill.jpg",
    });
    let b9 = new Brand({
      id: 9,
      name: "Pall Mall",
      origin: "USA",
      description:
        "Pall Mall is a brand of cigarettes produced by Imperial Tobacco in the United Kingdom. The brand was first introduced in 1902 and was the first cigarette brand to be advertised on television in 1955. The brand is currently owned by British American Tobacco.",
      noCountries: 55,
      photo:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Pall_Mall.jpg/220px-Pall_Mall.jpg",
    });
    let b10 = new Brand({
      id: 10,
      name: "Rothmans",
      origin: "USA",
      description:
        "Rothmans is a brand of cigarettes produced by Imperial Tobacco in the United Kingdom. The brand was first introduced in 1902 and was the first cigarette brand to be advertised on television in 1955. The brand is currently owned by British American Tobacco.",
      noCountries: 50,
      photo:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Rothmans.jpg/220px-Rothmans.jpg",
    });

    brands.push(b1);
    brands.push(b2);
    brands.push(b3);
    brands.push(b4);
    brands.push(b5);
    brands.push(b6);
    brands.push(b7);
    brands.push(b8);
    brands.push(b9);
    brands.push(b10);

    brands.forEach((brand) => {
      db.add(brand);
    });
  },

  getBrands: async function (page, pageSize) {
    if (page == -1 && pageSize == -1) {
      return await db.getAll(page, pageSize);
    }

    const { results, pageInfo } = await db.getAll(page, pageSize);
    brands = results;
    return {
      brands,
      pageInfo,
    };
  },

  getIDBrands: async function (id) {
    return await db.getByID(id);
  },

  createBrands: function (id, name, origin, description, noCountries, photo) {
    let newBrand = new Brand({
      id: id,
      name: name,
      origin: origin,
      description: description,
      noCountries: noCountries,
      photo: photo,
    });
    db.add(newBrand);
  },

  updateBrands: function (id, name, origin, description, noCountries, photo) {
    let idx = brands.findIndex((brand) => brand.id == id);
    id = parseInt(id);

    brands[idx] = {
      id: id,
      name: name,
      origin: origin,
      description: description,
      noCountries: noCountries,
      photo: photo,
    };

    db.update(brands[idx]);
  },

  deleteBrands: function (id) {
    db.delete(id);
  },

  addManyCigs: function (cigs) {
    dbCig.addMany(cigs);
  },

  getMaxID: async function () {
    return await db.getMaxID();
  },
};
