
// create router
const router = require('express').Router();

// import models
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint


// GET request for /api/products/
router.get('/', async (req, res) => {
  
  try {

    // store all rows in Product model as a javascript array
    const productData = await Product.findAll()

    // send that array to the user as JSON as the response
    return res.status(200).json(productData)
    
  } catch (error) {
    
    // if there is an error, log the error to the console, then return the error as JSON for the user
    console.log(error)
    return res.status(400).json(error)

  }

});

// get one product
router.get('/:paramId', async (req, res) => {

  try {
    
    // store all rows in Product model as a javascript array
    const productData = await Product.findAll()

    // deconstruct the route param the user typed into url out of req.params
    const {paramId} = req.params

    // find the first object in the entirity of productData that satisfies the condition 
    const singleObject = productData.find(object => object.product_id === Number(paramId))

    // return that object as JSON to the user as the response
    return res.status(200).json(singleObject)

  } catch (error) {
    
    // if there is an error, log the error to the console, then return the error as JSON for the user
    console.log(error)
    return res.status(400).json(error)

  }

});

// create new product
router.post('/', async (req, res) => {

  try {

    // create a variable to store the body of the POST request
    const newObject = req.body

    // create a new row in the Product model for whatever was in the body
    await Product.create(newObject)

    // store all rows in Product model as a javascript array
    const productData = await Product.findAll()

    // return the entire productData as JSON for the user as the response
    return res.status(200).json(productData)

  } catch (error) {
    
    // if there is an error, log the error to the console, then return the error as JSON for the user
    console.log(error)
    return res.status(400).json(error)

  }
   
});

// update product
router.put('/:id', async (req, res) => {

  try {
    
    // update the Product model, the row where product_id === Number(req.params.id) 
    await Product.update(req.body, {
      where: {
        product_id: Number(req.params.id),
      },
    })

    // store all rows in Product model as a javascript array
    const productData = await Product.findAll()

    // return that array as JSON to the user as the response
    return res.status(200).json(productData)

  } catch (error) {
    
    // if there is an error, log the error to the console, then return the error as JSON for the user
    console.log(error)
    return res.status(400).json(error)

  }

});

// delete product
router.delete('/:id', async (req, res) => {

  try {

    // delete the relevant row from the Product model, where product_id === Number(req.params.id)
    await Product.destroy(
      {
        where: {product_id: Number(req.params.id)}
      }
    )

    // store all rows in Product model as a javascript array
    const productData = await Product.findAll()

    // return that array as JSON to the user as the response
    return res.status(200).json(productData)

  } catch (error) {
    
    // if there is an error, log the error to the console, then return the error as JSON for the user
    console.log(error)
    return res.status(400).json(error)

  }

});



// export router
module.exports = router;
