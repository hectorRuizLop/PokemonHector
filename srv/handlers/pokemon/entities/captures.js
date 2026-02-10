const cds= require('@sap/cds');
const { SELECT } = require('@sap/cds/lib/ql/cds-ql');

async function uniquePokemons(req){
    const { PokemonName, team_ID } = req.data;

    //Tells the system to only select one to then compare it with .one
    //req.target instead of Captures because an error
    const existingPokemon =await SELECT.one.from(req.target).where({PokemonName:PokemonName, team_ID});

    if(existingPokemon){
        req.error(400, 'The pokemon is already in the team')
    }
}

module.exports={
    uniquePokemons
};