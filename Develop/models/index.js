// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// import sequelize
const {hasMany, BelongsTo, BelongsToMany} = require('sequelize')



// Categories have many Products
Category.hasMany(Product, {
  foreignKey: 'category_id',
  onDelete: 'CASCADE'
})

// Products belongsTo Category
Product.belongsTo(Category, {
  foreignKey: 'category_id',
  onDelete: 'CASCADE'
})

// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, {
  through: 'ProductTag',
  foreignKey: 'tag_id',
  onDelete: 'CASCADE'
})

// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag, {
  through: 'ProductTag',
  foreignKey: 'product_id',
  onDelete: 'CASCADE'
})



// export models
module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
