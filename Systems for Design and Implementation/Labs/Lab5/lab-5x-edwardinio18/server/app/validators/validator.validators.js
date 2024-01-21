class Validator {
  validateArrLen(type, arr) {
    if (!Array.isArray(arr)) {
      throw new Error("Invalid data (not array)");
    }

    if (type == 1) {
      if (arr.length == 0) {
        throw new Error("No data found");
      }
    } else if (type == 2) {
      if (arr.length != 0) {
        throw new Error("Data already exists");
      }
    } else if (type == 3) {
      arr.forEach((e) => {
        if (isNaN(e) || e < 0 || e % 1 != 0) {
          throw new Error("Invalid array data format");
        }
      });
    }
  }

  validateFields(type) {
    type.forEach((field) => {
      if (field[1] == "string") {
        if (field[0] == "" || field[0] == undefined || field[0] == null) {
          throw new Error("Invalid string data");
        }
      } else if (field[1] == "number") {
        if (isNaN(field[0]) || field[0] < 0 || field[0] % 1 != 0) {
          throw new Error("Invalid number data");
        }
      }
    });
  }

  isNumeric(str) {
    if (/^\d+$/.test(str)) {
      return true;
    } else {
      throw new Error("Invalid number data");
    }
  }
}

module.exports = Validator;
