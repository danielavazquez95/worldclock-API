const Sequelize = require('sequelize');
require('dotenv').config();

const TimeZoneModel = require('./models/Timezone');

const sequelize = new Sequelize( process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: 'remotemysql.com',
    dialect: 'mysql'
} );

const Timezones = TimeZoneModel(sequelize, Sequelize);

sequelize.sync({force: false})
    .then(() => {
        console.log('Synchronized tables')
    });

module.exports = {
    Timezones
};