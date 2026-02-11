const cds = require('@sap/cds')
const handlers = require('./handlers');
const { trainers, captures } = require('./handlers/pokemon/entities');

//You need one listener each time in sap cap 
module.exports = async function (srv) {
    //Check if the email format is correct
    this.before('CREATE', 'Trainers', handlers.pokemon.entities.trainers.validateEmailDomain);
    //Check if the Trainer is in the age addecuate
    this.before('CREATE', 'Trainers', handlers.pokemon.entities.trainers.validateAge)
    //Check if already exists a pokemon in the team
    this.before('CREATE', 'Captures', handlers.pokemon.entities.captures.uniquePokemons)
    //Set teams to inactive
    this.on('DELETE', 'Teams', handlers.pokemon.entities.teams.setTeamInactive)
    //Set a restriction that the team cannot be created without pokemons
    this.before('CREATE', 'Teams', handlers.pokemon.entities.teams.validateActiveTeamNotEmpty);

    };
