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

    //Set teams to inactive
    this.on('setTeamStatus', 'Teams', async (req) => {
        const id = req.params[0].ID || req.params[0];
        const {Active } =req.data;

        if (Active === undefined) {
             return req.error(400, "You have to specify if the team is active or not");
        }
        await UPDATE(this.entities.Teams, id).with({ Active: Active });
        return await SELECT.one.from(this.entities.Teams).where({ ID: id });
    });
    });



    
