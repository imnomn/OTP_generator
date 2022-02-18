'use strict';
const sequelize = require("../utils/database");
module.exports = {
    async up(queryInterface, Sequelize) {
        queryInterface.createTable("Users", {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true
            },
            name: {

                type: Sequelize.STRING,
                allowNull: false
            },
            otp: {

                type: Sequelize.STRING,


            },
            otp_expiration_date: {
                type: Sequelize.DATE
                    // defaultValue: sequelize.literal("CURRENT_TIMESTAMP + INTERVAL 5 MINUTE"),
            },
            phone_number: {

                type: Sequelize.STRING,
                allowNull: false
            },
            createdAt: Sequelize.DATE,
            updatedAt: Sequelize.DATE
        })

    },

    async down(queryInterface, Sequelize) {
        queryInterface.dropTable("Users")
    }
};