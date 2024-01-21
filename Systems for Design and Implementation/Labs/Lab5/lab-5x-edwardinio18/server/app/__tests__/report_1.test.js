const contBrand = require("../controllers/brand.controller.js")

const report1Tests = function () {
    test("Report cigarettes by brand at initial array size", async () => {
        const report = await contBrand.statBrands1()
        expect(report.length).toEqual(10)
    })

    test("Report first cigarette by brand by number of countries", async () => {
        const report = await contBrand.statBrands1()
        expect(report[0].noCountries).toEqual(100)
    })

    test("Report last cigarette by brand by average cigarette price", async () => {
        const report = await contBrand.statBrands1()
        expect(report[report.length - 1].avgCigPrice).toEqual(20)
    })

    test("Report first three brand names", async () => {
        const report = await contBrand.statBrands1()
        expect(report[0].name).toEqual("Sobranie")
        expect(report[1].name).toEqual("Pall Mall")
        expect(report[2].name).toEqual("Rothmans")
    })

    test("Report last three brand origins", async () => {
        const report = await contBrand.statBrands1()
        expect(report[report.length - 3].origin).toEqual("USA")
        expect(report[report.length - 2].origin).toEqual("USA")
        expect(report[report.length - 1].origin).toEqual("USA")
    })
}

report1Tests()