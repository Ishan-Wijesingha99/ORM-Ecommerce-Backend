const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  
  const tagData = await Tag.findAll()

  return res.json(tagData)

});

router.get('/:paramId', async (req, res) => {
  
  const tagData = await Tag.findAll()

  const {paramId} = req.params

  const singleObject = tagData.find(object => object.tag_id === Number(paramId))

  return res.json(singleObject)

});

router.post('/', (req, res) => {

  const newObject = req.body

  // need to change the database so that the Tag table actually has the new object
  Tag.create(newObject)
  .then(async (newTag) => {

  const tagData = await Tag.findAll()

  return res.json(tagData)

  }).catch(err => {
    console.log(err)
    res.status(400).json(err)
  })

});

router.put('/:id', async (req, res) => {
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
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value

  // first destroy this one
  await ProductTag.destroy({
    where: { tag_id: Number(req.params.id)}
  })

  // then destory this one
  await Tag.destroy({
    where: { tag_id: Number(req.params.id)}
  })

  const tagData = await Tag.findAll()

  res.json(tagData)

});

module.exports = router;
