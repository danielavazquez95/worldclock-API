module.exports = (sequelize, type) => {
    return sequelize.define('operation', {
        id:{
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: type.STRING,
    })
  
 };
 