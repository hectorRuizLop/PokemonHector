const cds = require('@sap/cds')
const handlers = require('./handlers');
const { trainers } = require('./handlers/pokemon/entities');

//You need one listener each time in sap cap 
module.exports = async function (srv) {
    this.before('CREATE', 'Trainers', handlers.pokemon.entities.trainers.validateEmailDomain);
    this.before('CREATE', 'Trainers', handlers.pokemon.entities.trainers.validateAge)


    };
