//jshint esversion : 9

const Sequelize = require("sequelize");

const sequelize = new Sequelize('OTP', 'root', '', {
    host: "127.0.0.1",
    dialect: 'mysql'
});

module.exports = sequelize;
global.sequelize = sequelize;