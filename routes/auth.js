const { sequelize, User } = require("../database");
let SHA256 = require("crypto-js/sha256");



async function loginRoute(req, res) {
    await res.view("/templates/login", {"title": "Login to Mirage"});
};

async function registrationRoute(req, res) {
    await res.view("/templates/registration", {"title": "Registration to Mirage"});
};

async function loginPostRoute(req, res) {
    let nick = req.body.login;
    let password = req.body.password;

    const user = await User.findOne({ where: { nick: nick, password: SHA256(password).toString(), } });
    
    if (user.email !== null)
        await res.redirect("/profile");
    
    await res.redirect("/");
};

async function registerPostRoute(req, res) {
    let nick = req.body.login;
    let email = req.body.email;
    let password = req.body.password;

    try {
        let newUser = User.create({ nick: nick, email: email, password: SHA256(password).toString() });
    } catch (err) {
        console.error(err);
    }

    res.redirect("/login");
};

module.exports = { 
    loginRoute: loginRoute, 
    registrationRoute: registrationRoute,
    loginPostRoute: loginPostRoute,
    registerPostRoute: registerPostRoute,
};