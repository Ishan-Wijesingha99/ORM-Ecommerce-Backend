
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
router.post('/', (req, res) => {

  /* req.body should look like this...
    {
      product_name: "Basketball",
      price: 200.00,
      stock: 3,
      tagIds: [1, 2, 3, 4]
    }
  */

  Product.create(req.body)
    .then((product) => {

      // if there's product tags, we need to create pairings to bulk create in the ProductTag model
      if (req.body.tagIds.length) {

        const productTagIdArr = req.body.tagIds.map((tag_id) => {

          return {
            product_id: product.id,
            tag_id,
          };

        });

        return ProductTag.bulkCreate(productTagIdArr);

      }

      // if no product tags, just respond
      res.status(200).json(product);

    })
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      
      // if there is an error, log the error to the console, then return the error as JSON for the user
      console.log(err);
      res.status(400).json(err);
    
    });
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
