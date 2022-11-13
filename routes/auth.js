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

    axios({
        method: "post",
        url: data.node_url[1] + "/users/auth",
        data: {
            type: "login",
            nick: data.nick,
            email: data.email,
            password: SHA384(data.password).toString(),
        },
    }).then(function(response) {
        let resp = response.data;
        if (resp.ID > 0) {
            req.session.authenticated = true;
            req.session.node_url = data.node_url[1];
        }
    });
    req.session.test = "test";
    res.redirect("/profile");
};

async function registerPostRoute(req, res) {
    if (req.body.node_url[0] == "custom" && req.body.node_url[1]) {

        axios({
            method: 'post',
            url: req.body.node_url[1] + "/users/auth",
            data: {
                type: "registration",
                nick: req.body.nick,
                email: req.body.email,
                password: SHA384(req.body.password).toString(),
            }
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