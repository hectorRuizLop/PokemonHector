const cds = require('@sap/cds')
const handlers = require('./handlers');

module.exports = async function (srv) {

    this.before('CREATE', 'Trainers', handlers.pokemon.entities.trainers.validateEmailDomain);

};