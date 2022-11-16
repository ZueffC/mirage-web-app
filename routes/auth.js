const SHA384 = require('crypto-js/sha384');
const axios = require("axios");


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
    let data = req.body
    let query_url = ""

    if (data.node_url[1][data.node_url[1].length - 1] == "/")
        query_url = data.node_url[1] + "users/auth"
    else
        query_url = data.node_url[1] + "/users/auth"

    axios.post(query_url, {
        nick: data.nick,
        email: data.email,
        password: data.password,
        type: "login",
    });

    req.session.test = "test";
    res.redirect("/profile");
};

async function registerPostRoute(req, res) {
    if (req.body.node_url[0] == "custom" && req.body.node_url[1]) {
        let data = req.body
        let query_url = ""

        if (data.node_url[1][data.node_url[1].length - 1] == "/")
            query_url = data.node_url[1] + "users/auth"
        else
            query_url = data.node_url[1] + "/users/auth"

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
};