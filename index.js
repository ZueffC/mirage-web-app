const fastify = require('fastify')();
const path = require('node:path');

const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');


fastify.register(require('@fastify/static'), {
    root: path.join(__dirname, 'static'),
    prefix: '/static/', // optional: default '/'
});

fastify.register(require("@fastify/view"), {
    engine: {
      eta: require("eta"),
    },
});

fastify.listen({ port: process.env.PORT || 3434 }, (error) => {
    console.log("Hello! Web server is listening!");
});


fastify.get("/", indexRouter.indexRoute);
fastify.get("/login", authRouter.loginRoute);
fastify.get("/registration", authRouter.registrationRoute);
