const cds = require('@sap/cds')

module.exports = cds.service.impl(async function() {
    const { Trainers } = this.entities

    this.before(['CREATE', 'UPDATE'], Trainers, (req) => {
        if (req.data.Email) {
            req.data.Email = req.data.Email.toLowerCase()
        }
    })
})