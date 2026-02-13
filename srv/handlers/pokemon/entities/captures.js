const cds= require('@sap/cds');
const { SELECT } = require('@sap/cds/lib/ql/cds-ql');

async function uniquePokemons(req){
    const { PokemonName, team_ID } = req.data;
    const db=await cds.connect.to("db")
    const Captures = db.entities["Captures"];
    //Tells the system to only select one to then compare it with .one
    //req.target instead of Captures because an error
    //const existingPokemon =await SELECT.one.from(req.target).where({PokemonName:PokemonName, team_ID});
        const existingPokemon =await SELECT.one.from(Captures).where({PokemonName:PokemonName, team_ID});

    if(existingPokemon){
        req.error(400, 'The pokemon is already in the team')
    }
}

async function validateCaptureDeletion(req){
    const { Captures, Teams } = cds.entities;
    const captureID = req.data.ID;
    const capture = await SELECT.one.from(Captures).where({ID:captureID});
    if(!capture) return; //If not exists the delte will fail on its own
    //Know the state of the team
    const team = await SELECT.one.from(Teams).where({ID:capture.team_ID})

    if (team && team.Active === true) {
        const pokemonCount = await SELECT.from(Captures).where({ team_ID: team.ID });
        if (pokemonCount.length <= 1) {
            return req.error(400, `.You cannot delete the last pokemon in the team because it is active`);
        }
    }
    
}

module.exports={
    uniquePokemons,
    validateCaptureDeletion
};