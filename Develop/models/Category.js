
// import modules
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');

// creating Category model
class Category extends Model {}
Category.init(
  {
    category_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    category_name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'category',
  }
);

// exporting Category model
module.exports = Category;
