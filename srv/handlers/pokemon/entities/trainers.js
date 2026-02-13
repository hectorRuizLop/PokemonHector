//The email must end with @nubexx.com or @nubexx.es
async function validateEmailDomain(req) {
    const { Email: email } = req.data;

    if (!email) return req.error(400, 'You need a mail'); 
    //The $ indicates that the string must finish there
    const emailRegex = /@(nubexx\.com|nubexx\.es)$/;

    if (!emailRegex.test(email)) {
        req.error(400, `The mail is invalid`);
    }
}


//The trainer must be in between 18 and 110 years old
//async it is not strictly neccesary like before because is a substract but is a good practice for the future
async function validateAge(req){

    //This lines extracts the raw input from the current user request
    const { Birthdate: birthDateRaw } = req.data;
    //And this converts the raw text into a js data object to use special methods
    const birthDate = new Date(birthDateRaw);
    const today = new Date();
    let age= today.getFullYear() - birthDate.getFullYear();

    if(age<18){
        req.error(400, 'The trainer is young to register')
    }
    if (age>110){
        req.error(400, 'The trainer is too old to register')
    }

}

//In this case we don't use req as a parametes
//Because we are using after so the ddbb has finished his job
//So we pick the output
function nameToUppercase(dataOfDDBB){
    //The => is the new way in js of function(trainer)
    //Pick the temporal variable trainer that represents the individual trainer
    //and put the parameter firstname in uppercase 
    dataOfDDBB.forEach(trainer => {
        trainer.FirstName = trainer.FirstName.toUpperCase();
    });

}

async function validateTrainerCreation(req) {
    await validateEmailDomain(req);
    await validateAge(req);
}




module.exports = {
    validateTrainerCreation,
    nameToUppercase
};