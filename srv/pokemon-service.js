const cds = require('@sap/cds')
const handlers = require('./handlers');

//You need one listener each time in sap cap 
module.exports = cds.service.impl(async function() {
    //Check if the email format is correct
    //Check if the Trainer is in the age addecuate
    this.before('CREATE', 'Trainers', handlers.pokemon.entities.trainers.validateTrainerCreation);

    //Check if already exists a pokemon in the team
    this.before('CREATE', 'Captures', handlers.pokemon.entities.captures.uniquePokemons);

    //Restriction of deleting teams
    this.before('DELETE', 'Teams', async (req) => {
        req.error(405, "You cannot delte teams");
    });

    //Set a restriction that the team cannot be created without pokemons
    this.before('CREATE', 'Teams', handlers.pokemon.entities.teams.validateActiveTeamNotEmpty);
    
    //Put the first name of the trainer into upper case
    this.after('READ', 'Trainers', handlers.pokemon.entities.trainers.nameToUppercase);

   this.on('setTeamStatus', 'Teams', handlers.pokemon.entities.teams.setTeamStatus)
    });



    
