const cds = require('@sap/cds')
const { UPDATE, SELECT } = require("@sap/cds/lib/ql/cds-ql");

async function setTeamInactive(req){
    const id = req.data.ID;
    await UPDATE(req.target).set({Active: false}).where({ID: id});
    //It is neccesary to give cap a signal that is finished
    return;
}

async function validateActiveTeamNotEmpty(req){
    const{Active, ID}=req.data;
    if(Active===true){
        const{Captures}=cds.entities;
        const pokemonCount= await SELECT.from(Captures).where({team_ID: ID});
        
        //In js !pokemons doesn't work because [] is true
        if(pokemonCount.length>0){
            //If it has pokemos we active it
            req.data.Active=true;
        }else{
            req.data.Active=false;
        }
    }
}

module.exports={
    setTeamInactive,
    validateActiveTeamNotEmpty
};