const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  
  const categoryData = await Category.findAll()

  return res.json(categoryData)
});

router.get('/:paramId', async (req, res) => {
  const categoryData = await Category.findAll()

  const {paramId} = req.params

  const singleObject = categoryData.find(object => object.category_id === Number(paramId))
  
  return res.json(singleObject)
});

router.post('/', (req, res) => {
  // create a new category
  res.send('POST /api/categories route')

});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  res.send('PUT /api/categories/:id route')
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  res.send('DELETE /api/categories/:id route')
});

module.exports = router;
