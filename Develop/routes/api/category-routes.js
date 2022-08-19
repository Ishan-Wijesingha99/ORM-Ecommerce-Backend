const router = require('express').Router();
const { Category, Product, ProductTag } = require('../../models');


// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  
  try {

    const categoryData = await Category.findAll()
    return res.json(categoryData)

  } catch (error) {

    console.log(error)
    return res.status(400).json(error)

  }

});

router.get('/:paramId', async (req, res) => {

  try {

    const categoryData = await Category.findAll()

    const {paramId} = req.params

    const singleObject = categoryData.find(object => object.category_id === Number(paramId))
    
    return res.json(singleObject)

  } catch (error) {
    
    console.log(error)
    return res.status(400).json(error)

  }

});

router.post('/', (req, res) => {
 
  try {

    const newObject = req.body

    await Category.create(newObject)

    const categoryData = await Category.findAll()

    return res.json(categoryData)

  } catch (error) {
    
    console.log(error)
    return res.status(400).json(error)

  }

});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  // update a tag's name by its `id` value

  try {
    
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

  } catch (error) {
    
    console.log(error)
    return res.status(400).json(error)

  }
  
});

router.delete('/:id', async (req, res) => {
  
  try {

    await Category.destroy(
      {
        where: {category_id: Number(req.params.id)}
      }
    )
  
    const categoryData = await Category.findAll()
  
    res.json(categoryData)

  } catch (error) {
    
    console.log(error)
    return res.status(400).json(error)

  }

});

module.exports = router;
