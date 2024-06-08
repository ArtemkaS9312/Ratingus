const { Pool } = require('pg');
const { DataTypes, Sequelize } = require('sequelize');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'ratingus',
    password: '123',
    port: 5432,
});

const sequelize = new Sequelize({
    dialect: 'postgres',
    database: 'ratingus',
    username: 'postgres',
    password: '123',
    host: 'localhost',
});
// sequelize.authenticate()
//   .then(() => {
//     console.log('Connection has been established successfully.');
//     return Token.sync({ force: true }); 
//   })
//   .catch(err => {
//     console.error('Unable to connect to the database:', err);
//   });
const Token = sequelize.define('Token', {
    admin: {
        type: DataTypes.INTEGER, 
        references: {
            model: 'Admins',
            key: 'id'
        }
    },
    refreshToken: {
        type: DataTypes.STRING,
        allowNull: false
   }
});

module.exports = Token;