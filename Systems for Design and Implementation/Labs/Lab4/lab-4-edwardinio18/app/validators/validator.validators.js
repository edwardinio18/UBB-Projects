class Validator {
    validateArrLen(type, arr) {
        if (!Array.isArray(arr)) {
            throw new Error("Invalid data (not array)")
        }

        if (type == 1) {
            if (arr.length == 0) {
                throw new Error("No data found")
            }
        } else if (type == 2) {
            if (arr.length != 0) {
                throw new Error("Data already exists")
            }
        }
    }

    validateFields(type) {
        type.forEach(field => {
            if (field[1] == "string") {
                if (field[0] == "" || field[0] == undefined || field[0] == null || !isNaN(field[0]) || !field[0] instanceof String) {
                    throw new Error("Invalid string data")
                }
            } else if (field[1] == "number") {
                if (field[0] == undefined || field[0] == null || isNaN(field[0]) || !field[0] instanceof Number) {
                    throw new Error("Invalid number data")
                }
            }
        })
    }
}

module.exports = Validator