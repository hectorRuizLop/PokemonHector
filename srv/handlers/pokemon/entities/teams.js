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

async function setTeamStatus(req) {
    const id = req.params[0].ID || req.params[0];
    const {Active } =req.data;

    if (Active === true) {
        const { Captures } = cds.entities;
        
        const id = req.params[0].ID || req.params[0];

        const pokemonCount = await SELECT.from(Captures).where({ team_ID: id });
        
        if (pokemonCount.length === 0) {
            return req.error(400, "You cannot activate a team without pokemons");
        }
    }

    await UPDATE(req.subject).with({ Active: Active });
    return await SELECT.one.from(req.subject);
    
}

module.exports={
    setTeamInactive,
    validateActiveTeamNotEmpty,
    setTeamStatus
};