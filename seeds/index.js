const userSeeds = require('');
const postSeeds = require('')
const commentSeeds = require('');

const sequelize = require('../config/connection')

const seed = async () => {
    await sequelize.sync({ force: true });
    await userSeeds();
    await postSeeds();
    await commentSeeds();
    process.exit(0);
};

seed();