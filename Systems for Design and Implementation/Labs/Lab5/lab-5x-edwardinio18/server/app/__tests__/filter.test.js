const contCig = require("../controllers/cigarette.controller.js")

const filterTests = function () {
    test("Filtering cigarettes with price > 22", async () => {
        const cigs = await contCig.filterCigs(22, undefined)
        expect(cigs.length).toEqual(4)
    })
    
    test("Filtering cigarettes with price > 50", async () => {
        const cigs = await contCig.filterCigs(50, undefined)
        expect(cigs.length).toEqual(0)
    })

    test("Filtering cigarettes with price > 0", async () => {
        const cigs = await contCig.filterCigs(0, undefined)
        expect(cigs.length).toEqual(10)
    })

    test("Filtering cigarettes with price > 1000000", async () => {
        const cigs = await contCig.filterCigs(1000000, undefined)
        expect(cigs.length).toEqual(0)
    })

    test("Filtering cigarettes with price > 25", async () => {
        const cigs = await contCig.filterCigs(25, undefined)
        expect(cigs.length).toEqual(0)
    })
}

filterTests()