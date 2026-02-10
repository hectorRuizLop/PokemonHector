const { UPDATE } = require("@sap/cds/lib/ql/cds-ql");

async function setTeamInactive(req){
    const id = req.data.ID;
    await UPDATE(req.target).set({Active: false}).where({ID: id});
    //It is neccesary to give cap a signal that is finished
    return;
}

module.exports={
    setTeamInactive
};