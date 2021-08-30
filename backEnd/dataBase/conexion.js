const Sequelize = require('sequelize');
const path = 'mysql://root:admin@localhost:3306/data_warehouse';
const sequelize = new Sequelize(path);
module.exports = sequelize;