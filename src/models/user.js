const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    return sequelize.define(
        "User",
        {
            userId:{
                type:DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                field: "user_id",
            },
            fullName:{
                type:DataTypes.STRING,
                field: "full_name",
                allowNull: false,
            },
            email:{
                type:DataType.STRING,
                allowNull: false,
                unique: true,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            role:{
                type:DataTypes.ENUM("user", "admin"),
                defaultValue: "user",
            },
        },
        {
            tableName: "users",
            timestamps: false,
            defaultScope:{
                attributes:{
                    exclude:["password"],
                },
            },
            hooks:{
                afterSave: (record) => { 
                    delete record.dataValue.password;
                 }
            },
        },
    );
};