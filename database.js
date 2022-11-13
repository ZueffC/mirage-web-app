const { Sequelize, DataTypes } = require('sequelize');


const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "./database.sqlite",
});


async function init() {
    await sequelize.authenticate();
}

try {
    init();
} catch(error){
    console.log("An error occurred while initializing the database: ", error);
}

module.exports = { sequelize };