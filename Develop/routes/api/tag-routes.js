const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  
  try {
    
    const tagData = await Tag.findAll()

    return res.json(tagData)

  } catch (error) {
    
    console.log(error)
    return res.status(400).json(error)

  }

});

router.get('/:paramId', async (req, res) => {
  
  try {
    
    const tagData = await Tag.findAll()

    const {paramId} = req.params

    const singleObject = tagData.find(object => object.tag_id === Number(paramId))

    return res.json(singleObject)

  } catch (error) {
    
    console.log(error)
    return res.status(400).json(error)

  }

});

router.post('/', async (req, res) => {

  try {
    
    const newObject = req.body

    // need to change the database so that the Tag table actually has the new object
    await Tag.create(newObject)

    const tagData = await Tag.findAll()

    return res.json(tagData)

  } catch (error) {
    
    console.log(error)
    return res.status(400).json(error)

  }

});

router.put('/:id', async (req, res) => {

  try {
  
    // update a tag's name by its `id` value
    const {tag_name} = req.body

    await Tag.update(
      {tag_name}
      ,
      {
        where: {tag_id: req.params.id}
      }
    )
    
    const tagData = await Tag.findAll()

    return res.json(tagData)

  } catch (error) {
    
    console.log(error)
    return res.status(400).json(error)

  }

});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value

  try {

    await ProductTag.destroy({
      where: { tag_id: Number(req.params.id)}
    })
  
    // then destory this one
    await Tag.destroy({
      where: { tag_id: Number(req.params.id)}
    })
  
    const tagData = await Tag.findAll()
  
    return res.json(tagData)

  } catch (error) {
    
    console.log(error)
    return res.status(400).json(error)

  }

});

module.exports = router;
