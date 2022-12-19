require('dotenv').config();
const Sequelize = require('sequelize');
const sequelize = new Sequelize({
    dialect: process.env.DB_TYPE,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    logging: false,
});

const Settings = require('../models/settingsModel')(sequelize, Sequelize.DataTypes);
const Warnings = require('../models/warningModel')(sequelize, Sequelize.DataTypes);
const Bans = require('../models/banModel')(sequelize, Sequelize.DataTypes);
const Mutes = require('../models/muteModel')(sequelize, Sequelize.DataTypes);

// Create any associations

// Create any properties

module.exports = {
  Settings,
  Warnings,
  Bans,
  Mutes,
};