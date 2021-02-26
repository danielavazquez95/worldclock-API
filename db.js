const Sequelize = require('sequelize');
const TimeZoneModel = require('./models/Timezone');

const sequelize = new Sequelize('KuUHuZ5yWR', 'KuUHuZ5yWR', '6vXuwPYGnc', {
    host: 'remotemysql.com',
    dialect: 'mysql'
} );

const Timezones = TimeZoneModel(sequelize, Sequelize);

sequelize.sync({force: true})
    .then(() => {
        console.log('Synchronized tables')
    });

module.exports = {
    Timezones
};