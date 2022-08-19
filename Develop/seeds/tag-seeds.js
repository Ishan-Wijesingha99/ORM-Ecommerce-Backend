
// import Tag model
const { Tag } = require('../models');

// create array of data
const tagData = [
  {
    tag_name: 'rock music',
  },
  {
    tag_name: 'pop music',
  },
  {
    tag_name: 'blue',
  },
  {
    tag_name: 'red',
  },
  {
    tag_name: 'green',
  },
  {
    tag_name: 'white',
  },
  {
    tag_name: 'gold',
  },
  {
    tag_name: 'pop culture',
  },
];

// use BulkCreate to seed the Tag model with the above array of data
const seedTags = () => Tag.bulkCreate(tagData);

// export seedTags function
module.exports = seedTags;
