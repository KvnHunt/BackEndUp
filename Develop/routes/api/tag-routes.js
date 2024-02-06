const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  try {
    const tagData = async  Tag.findAll({
      include: [{ model: Product, through: ProductTag, as: 'productTag_products'}]
    });
  await  res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get('/:id', (req, res) => {
  try {
    const tagData = async  Tag.findByPk(req.params.id, {
      include: [{ model: Product, through: ProductTag, as: 'productTag_products' }]
    });
   await (!tagData) {
      res.status(400).json({ message: 'No Product found with this id' });
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', (req, res) => {
  try {
    const tagData = await Tag.create(req.body);
    res.status(200).json(tagData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', (req, res) => {
  Tag.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
  .then((tag) => {
    res.status(200).json(tag);
  }) .catch((err) => {
    console.log(err);
    res.status(400).json(err);
  });
});

router.delete('/:id', (req, res) => {
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });
    if(!tagData) {
      res.status(404).json({message: 'No Cateogory found with that ID'});
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
