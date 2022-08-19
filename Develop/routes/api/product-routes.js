const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// get all products
router.get('/', async (req, res) => {
  
  const productData = await Product.findAll()

  return res.json(productData)

});

// get one product
router.get('/:paramId', async (req, res) => {

  const productData = await Product.findAll()

  const {paramId} = req.params

  const singleObject = productData.find(object => object.product_id === Number(paramId))

  return res.json(singleObject)

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
      console.log(err);
      res.status(400).json(err);
    });
});

// update product
router.put('/:id', async (req, res) => {
  // update product data
  await Product.update(req.body, {
    where: {
      product_id: Number(req.params.id),
    },
  })

  const productData = await Product.findAll()

  return res.json(productData)

});

router.delete('/:id', (req, res) => {
  // delete one product by its `id` value
});

module.exports = router;
