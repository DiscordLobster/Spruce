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

require('../../src/models/settingsModel')(sequelize, Sequelize.DataTypes);
require('../../src/models/warningModel')(sequelize, Sequelize.DataTypes);
require('../../src/models/banModel')(sequelize, Sequelize.DataTypes);
require('../../src/models/muteModel')(sequelize, Sequelize.DataTypes);

const force = process.argv.includes('force') || process.argv.includes('--f');

sequelize.sync({ force }).then(() => {
    console.log('Initialized data tables');
    sequelize.close();
});