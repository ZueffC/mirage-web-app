const SHA384 = require('crypto-js/sha384');
const axios = require("axios");


function getRightUrl(url, adding) {
    if (url[url.length - 1] == "/")
        return query_url = url + adding
    else
        return query_url = url + "/" + adding
}

async function loginRoute(req, res) {
    await res.view("login", {
        "title": "Login to Mirage"
    });
};

async function registrationRoute(req, res) {
    await res.view("registration", {
        "title": "Registration to Mirage"
    });
};

async function loginPostRoute(req, res) {
    let data = req.body;
    let query_url = getRightUrl(data.node_url[1], "users/auth");

    console.log(query_url);

    axios.post(query_url, {
        type: "login",
        nick: data.nick,
        email: data.email,
        password: SHA384(data.password).toString(),
    }).then(function(response) {
        if (response.data.ID > 0 && response.data.nick.length > 0) {
            console.log(response.data)
            req.session.node_url = data.node_url[1];
            req.session.id = response.data.ID;
            req.session.nick = response.data.nick;
            req.session.email = response.data.email;
        }
    });
    res.redirect("/profile");
};

async function registerPostRoute(req, res) {
    if (req.body.node_url[0] == "custom" && req.body.node_url[1]) {
        let data = req.body
        let query_url = getRightUrl(data.node_url[1], "users/auth");

        axios.post(query_url, {
            type: "registration",
            nick: data.nick,
            email: data.email,
            password: SHA384(data.password).toString(),
        });

        res.redirect("/login");
    } else {
        res.redirect("/");
    }

    //res.redirect("/login");
};

module.exports = {
    loginRoute: loginRoute,
    registrationRoute: registrationRoute,
    loginPostRoute: loginPostRoute,
    registerPostRoute: registerPostRoute,
    getRightUrl: getRightUrl,
};