const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// Get all Tags
router.get('/', (req, res) => {
  Tag.findAll({
    include: [
      {
        model: Product,
        through: ProductTag
      }
    ]
  })
    .then((tag) => res.status(200).json(tag))
    .catch((err) => res.status(400).json(err))
});

// Get a tag by id
router.get('/:id', (req, res) => {
  Tag.findByPk((req.params.id),
    {
      include: [{ model: Product }]
    },
  ).then((tagData) => {
    res.json(tagData);
  })
});

// Create a new tag
router.post('/', (req, res) => {
  Tag.create(req.body)
    .then((newTag) => {
      res.json(newTag);
    })
    .catch((err) => {
      res.json(err);
    });
});

// Update a tag's name by its `id` value
router.put('/:id', (req, res) => {
  try {
    const tagData = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!tagData[0]) {
      res.status(404).json({ message: 'No tag with this id!' });
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete tag by 'id' value
router.delete('/:id', (req, res) => {
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!tagData) {
      res.status(404).json({ message: 'No tag with this id!' });
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
