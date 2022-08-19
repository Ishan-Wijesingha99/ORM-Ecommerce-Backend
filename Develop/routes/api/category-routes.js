const router = require('express').Router();
const { Category, Product, ProductTag } = require('../../models');


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
 
  const newObject = req.body

  // need to change the database so that the Tag table actually has the new object
  Category.create(newObject)
  .then(async (newCategory) => {

  const categoryData = await Category.findAll()

  return res.json(categoryData)

  }).catch(err => {
    console.log(err)
    res.status(400).json(err)
  })
  

});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  // update a tag's name by its `id` value

  const {category_name} = req.body

  await Category.update(
    {category_name}
    ,
    {
      where: {category_id: req.params.id}
    }
  )
  
  const categoryData = await Category.findAll()

  return res.json(categoryData)
});

router.delete('/:id', async (req, res) => {
  
  await Category.destroy(
    {
      where: {category_id: Number(req.params.id)}
    }
  )

  const categoryData = await Category.findAll()

  res.json(categoryData)

});

module.exports = router;
