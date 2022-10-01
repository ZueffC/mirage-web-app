const { Sequelize, DataTypes } = require('sequelize');


const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "./database.sqlite",
});


const User = sequelize.define('User', {
    nick: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false},
    password: { type: DataTypes.STRING, allowNull: false },
    passCode: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
});

async function init() {
    await sequelize.authenticate();
    await User.sync();
}

try {
    init();
} catch(error){
    console.log("An error occurred while initializing the database: ", error);
}

module.exports = { sequelize, User };