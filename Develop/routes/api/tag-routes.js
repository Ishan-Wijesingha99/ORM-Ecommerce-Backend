
// create router
const router = require('express').Router();

// import models
const { Tag, Product, ProductTag } = require('../../models');



// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  
  try {
    
    // store all rows in Tag model as a javascript array
    const tagData = await Tag.findAll()

    // send that array to the user as JSON as the response
    return res.status(200).json(tagData)

  } catch (error) {
    
    // if there is an error, log the error to the console, then return the error as JSON for the user
    console.log(error)
    return res.status(400).json(error)

  }

});

router.get('/:paramId', async (req, res) => {
  
  try {
    
    // store all rows in Tag model as a javascript array
    const tagData = await Tag.findAll()

    // deconstruct the route param that the user typed into the url
    const {paramId} = req.params

    // find the first object in the entirity of tagData that satisfies the condition 
    const singleObject = tagData.find(object => object.tag_id === Number(paramId))

    // send that object to the user as JSON as the response
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

    // create a new row in the Tag model for whatever was in the body
    await Tag.create(newObject)

    // store all rows in Tag model as a javascript array
    const tagData = await Tag.findAll()

    // send that array to the user as JSON as the response
    return res.status(200).json(tagData)

  } catch (error) {
    
    // if there is an error, log the error to the console, then return the error as JSON for the user
    console.log(error)
    return res.status(400).json(error)

  }

});

router.put('/:id', async (req, res) => {

  try {
  
    // deconstruct tag_name from the request body
    const {tag_name} = req.body

    // update the Tag model, the row where tag_id === Number(req.params.id)
    await Tag.update(
      {tag_name}
      ,
      {
        where: {tag_id: req.params.id}
      }
    )
    
    // store all rows in Tag model as a javascript array
    const tagData = await Tag.findAll()

    // send that array to the user as JSON as the response
    return res.status(200).json(tagData)

  } catch (error) {
    
    // if there is an error, log the error to the console, then return the error as JSON for the user
    console.log(error)
    return res.status(400).json(error)

  }

});

router.delete('/:id', async (req, res) => {

  try {

    // first, destroy the relevant row in the ProductTag model
    await ProductTag.destroy({
      where: { tag_id: Number(req.params.id)}
    })
  
    // second, destory the relevant row in the Tag model
    await Tag.destroy({
      where: { tag_id: Number(req.params.id)}
    })
  
    // store all rows in Tag model as a javascript array
    const tagData = await Tag.findAll()
  
    // send that array to the user as JSON as the response
    return res.status(200).json(tagData)

  } catch (error) {
    
    // if there is an error, log the error to the console, then return the error as JSON for the user
    console.log(error)
    return res.status(400).json(error)

  }

});



// export router
module.exports = router;
