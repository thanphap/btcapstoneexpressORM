const { DataTypes } = require("sequelize");
const bcrypt = require('bcrypt');

module.exports = (sequelize) => {
    return sequelize.define(
        "User",
        {
            userId: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                field: "user_id",
            },
            fullName: {
                type: DataTypes.STRING,
                field: "full_name",
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
                set(value){
                    const salt = bcrypt.genSaltSync();
                    const hashedPassword = bcrypt.hashSync(value, salt);
                    this.setDataValue('password', hashedPassword);
                }
            },
            age: {
                type: DataTypes.INTEGER,
            },
            avatar: {
                type: DataTypes.STRING,
            },
            role: {
                type: DataTypes.ENUM("user", "admin"),
                defaultValue: "user",
            },
        },
        {
            tableName: "users",
            timestamps: false,
            defaultScope: {
                attributes: {
                    exclude: ["password"],
                },
            },
            hooks: {
                afterSave: (record) => {
                    delete record.dataValues.password;
                }
            },
        },
    );
};