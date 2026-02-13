const cds = require('@sap/cds')
const handlers = require('./handlers');

//You need one listener each time in sap cap 
module.exports = cds.service.impl(async function() {
    // TRAINERS 
    // Check if the email format is correct and check age
    this.before('CREATE', 'Trainers', handlers.pokemon.entities.trainers.validateTrainerCreation);
    
    // Put the first name of the trainer into upper case
    this.after('READ', 'Trainers', handlers.pokemon.entities.trainers.nameToUppercase);

    // CAPTURES 
    // Check if already exists a pokemon in the team
    this.before('CREATE', 'Captures', handlers.pokemon.entities.captures.uniquePokemons);

    // Check if we are deleting the last pokemon of an active team
    this.before('DELETE', 'Captures', handlers.pokemon.entities.captures.validateCaptureDeletion);

    // TEAMS
    // Restriction of deleting teams (Physical delete forbidden)
    this.before('DELETE', 'Teams', async (req) => {
        req.error(405, "You cannot delete teams. Use 'setTeamStatus' action instead.");
    });

    // Set a restriction that the team cannot be created without pokemons (force inactive)
    this.before('CREATE', 'Teams', handlers.pokemon.entities.teams.validateActiveTeamNotEmpty);
    
    // Action to change status (Soft Delete / Reactivation)
    this.on('setTeamStatus', 'Teams', handlers.pokemon.entities.teams.setTeamStatus); });



    
