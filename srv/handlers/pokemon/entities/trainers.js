async function validateEmailDomain(req) {
    const email = req.data.Email;

    if (!email) return;
    //The $ indicates that the string must finish there
    const emailRegex = /@(nubexx\.com|nubexx\.es)$/;

    if (!emailRegex.test(email)) {
        req.error(400, `The mail is invalid`);
    }
}
module.exports = {
    validateEmailDomain
};