async function profileRoute(req, res) {
    return req.session;
}


module.exports = {
    profileRoute: profileRoute
};