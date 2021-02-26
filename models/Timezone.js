module.exports = (sequelize, type) => {
    return sequelize.define('Timezones', {
        id:{
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: type.STRING,
    })
  
 };
 