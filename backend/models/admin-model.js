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
//     return Admin.sync({ force: true }); 
//   })
//   .catch(err => {
//     console.error('Unable to connect to the database:', err);
//   });


const Admin = sequelize.define('Admins', {
    email: {
        type: DataTypes.STRING,
        unique: true,
        required: true
    },
    password: {
        type: DataTypes.STRING,
        required: true
    },

});

module.exports = Admin;