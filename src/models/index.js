const { Sequelize } = require('sequelize');
const configs = require('../config');

const sequelize = new Sequelize(configs.DB_NAME, configs.DB_USER, configs.DB_PASSWORD, {
    dialect: configs.DB_DIALECT,
    host: configs.DB_HOST,
    port: configs.DB_PORT,
});

(async () => {
    try {
        await sequelize.authenticate();
        console.log("Sequelize Connected");
    } catch (error) {
        console.log("Sequelize Error", error);
    }
})();

const User = require('./User')(sequelize);
const Image = require('./Image')(sequelize);
const Comments = require('./Comments')(sequelize);
const ImageSaves = require('./ImageSaves')(sequelize);

Image.belongsTo(User, { as: "userCreate", foreignKey: "userId" });
User.hasMany(Image, { as: "imageCreates", foreignKey: "userId" });

User.belongsToMany(Image, {
    as: "imageComments",
    through: Comments,
    foreignKey: "userId",
});

Image.belongsToMany(User, {
    as: "userComments",
    through: Comments,
    foreignKey: "imageId",
});

User.belongsToMany(Image, {
    as: "imageSaves",
    through: ImageSaves,
    foreignKey: "userId",
});

Image.belongsToMany(User, {
    as: "userSaves",
    through: ImageSaves,
    foreignKey: "imageId",
});

module.exports = {
    sequelize,
    User,
    Image,
};