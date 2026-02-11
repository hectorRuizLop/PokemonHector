const cds = require('@sap/cds')
const { UPDATE, SELECT } = require("@sap/cds/lib/ql/cds-ql");

async function setTeamInactive(req){
    const id = req.data.ID;
    await UPDATE(req.target).set({Active: false}).where({ID: id});
    //It is neccesary to give cap a signal that is finished
    return;
}

async function validateActiveTeamNotEmpty(req){
    const{Active}=req.data;
    const ID =req.data.ID;
    if(Active==true){
        const{Captures}=cds.entities;
        const pokemonCount= await SELECT.from(Captures).where({team_ID: ID});
        
        //In js !pokemons doesn't work because [] is true
        if(pokemonCount.length==0){
            req.error(400, ' The team cannot be created without pokemons')
        }
    }
}

module.exports={
    setTeamInactive,
    validateActiveTeamNotEmpty
};