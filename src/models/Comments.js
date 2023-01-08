const { DataTypes, Sequelize} = require("sequelize");

module.exports = (sequelize) => { 
    return sequelize.define(
        "Comment",
        {
            userId:{
                type: DataTypes.INTEGER,
                primaryKey: true,
                field: "user_id",
            },
            imageId:{
                type: DataTypes.INTEGER,
                primaryKey: true,
                field: 'image_id',
            },
            content:{
                type: DataTypes.STRING,
                allowNull: false,
            },
            createdComment:{
                type: DataTypes.DATE,
                defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
                field: "created_comment",
            }
        },
        {
            tableName: "comments",
            timestamps: false,
        }
    );
 };