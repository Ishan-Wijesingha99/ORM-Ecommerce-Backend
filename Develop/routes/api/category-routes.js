
// setting up router
const router = require('express').Router();

// importing models
const { Category, Product, ProductTag } = require('../../models');



// The `/api/categories` endpoint



router.get('/', async (req, res) => {
  
  try {

    // store all rows in Category model as a javascript array
    const categoryData = await Category.findAll()

    // send that array to the user as JSON as the response
    return res.status(200).json(categoryData)

  } catch (error) {

    // if there is an error, log the error to the console, then return the error as JSON for the user
    console.log(error)
    return res.status(400).json(error)

  }

});

router.get('/:paramId', async (req, res) => {

  try {

    // store all rows in Category model as a javascript array
    const categoryData = await Category.findAll()

    // deconstruct route param that user typed into url
    const {paramId} = req.params

    // find the first object in the entirity of categoryData that satisfies the condition 
    const singleObject = categoryData.find(object => object.category_id === Number(paramId))
    
    // return that object as JSON to the user as the response
    return res.status(200).json(singleObject)

  } catch (error) {
    
    // if there is an error, log the error to the console, then return the error as JSON for the user
    console.log(error)
    return res.status(400).json(error)

  }

});

router.post('/', async (req, res) => {
 
  try {

    // create a variable to store the body of the POST request
    const newObject = req.body

    // create a new row in the Category model for whatever was in the body
    await Category.create(newObject)

    // store all rows in Category model as a javascript array
    const categoryData = await Category.findAll()

    // return the entire categoryData as JSON for the user as the response
    return res.status(200).json(categoryData)

  } catch (error) {
    
    // if there is an error, log the error to the console, then return the error as JSON for the user
    console.log(error)
    return res.status(400).json(error)

  }

});

router.put('/:id', async (req, res) => {

  try {
    
    // deconstruct category_name from the body of the PUT request
    const {category_name} = req.body

    // update the Category model, the row where category_id === Number(req.params.id)
    await Category.update(
      {category_name}
      ,
      {
        where: {category_id: Number(req.params.id)}
      }
    )

    // store all rows in Category model as a javascript array
    const categoryData = await Category.findAll()

    // return the entire categoryData as JSON for the user as the response
    return res.status(200).json(categoryData)

  } catch (error) {
    
    // if there is an error, log the error to the console, then return the error as JSON for the user
    console.log(error)
    return res.status(400).json(error)

  }
  
});

router.delete('/:id', async (req, res) => {
  
  try {

    // delete the row in the Category model, where category_id === Number(req.params.id)
    await Category.destroy(
      {
        where: {category_id: Number(req.params.id)}
      }
    )
  
    // store all rows in Category model as a javascript array
    const categoryData = await Category.findAll()
  
    // return the entire categoryData as JSON for the user as the response
    return res.status(200).json(categoryData)

  } catch (error) {
    
    // if there is an error, log the error to the console, then return the error as JSON for the user
    console.log(error)
    return res.status(400).json(error)

  }

});



// export router
module.exports = router;
