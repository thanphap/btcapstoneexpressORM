const { DataTypes } = require("sequelize");
const bcrypt = require('bcrypt');
const { AppError } = require("../helpers/error");

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
                set(value) {
                    const pattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
                    if (!pattern.test(value)) {
                        throw new AppError(400, 'Email is not in the correct format');
                    }
                    this.setDataValue('email', value);
                }
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
                set(value) {
                    const pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{0,}$/;
                    if (!pattern.test(value)) {
                        throw new AppError(400, 'Password must include special characters, uppercase, lowercase, numbers');
                    }
                    const salt = bcrypt.genSaltSync();
                    const hashedPassword = bcrypt.hashSync(value, salt);
                    this.setDataValue('password', hashedPassword);
                }
            },
            age: {
                type: DataTypes.INTEGER,
                set(value) {
                    if (!Number.isInteger(value)) {
                        throw new AppError(400, 'Age must be an integer');
                    }
                    if (parseInt(value) < 1) {
                        throw new AppError(400, 'Age must be greater than 0');
                    }
                    this.setDataValue('age', value);
                }
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