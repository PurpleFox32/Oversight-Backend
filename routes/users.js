var express = require('express');
var router = express.Router();
const { User } = require('../models');

/* GET users listing. */
router.get('/', function (req, res, next) {
  User.findAll().then((userList) => {
    res.json(userList);
  });
});

/* GET /:id get individual user */
router.get('/:id', (req, res, next) => {
  const userId = parseInt(req.params.id);

  User.findOne({
    where: {
      id: userId,
    },
  }).then(
    (theUser) => {
      if (theUser) {
        res.json(theUser);
      } else {
        res.status(404).send();
      }
    },
    (err) => {
      res.status(500).send(err);
    }
  );
});

/* POST create a user */
router.post('/', (req, res, next) => {
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  })
    .then((newUser) => {
      res.json(newUser);
    })
    .catch(() => {
      res.status(400).send();
    });
});

/* PUT update a user */
router.put('/:id', (req, res, next) => {
  const userId = parseInt(req.params.id);

  if (!catId || catId <= 0) {
    res.status(400).send('Invalid ID');
    return;
  }

  User.update(
    {
      email: req.body.email,
    },
    {
      where: {
        id: userId,
      },
    }
  )
    .then(() => {
      res.status(204).send();
    })
    .catch(() => {
      res.status(400).send();
    });
});

/* DELETE delete a user */
router.delete('/:id', (req, res, next) => {
  const userId = parseInt(req.params.id);

  if (!userId || userId <= 0) {
    res.status(400).send('Invalide ID');
    return;
  }

  User.destroy({
    where: {
      id: userId,
    },
  })
    .then(() => {
      res.status(204).send();
    })
    .catch(() => {
      res.status(400).send();
    });
});

module.exports = router;
