
// import Category model
const { Category } = require('../models');

// create array of data
const categoryData = [
  {
    category_name: 'Shirts',
  },
  {
    category_name: 'Shorts',
  },
  {
    category_name: 'Music',
  },
  {
    category_name: 'Hats',
  },
  {
    category_name: 'Shoes',
  },
];

// use BulkCreate to seed the Category model with the above array of data
const seedCategories = () => Category.bulkCreate(categoryData);

// export seedCategories function
module.exports = seedCategories;
