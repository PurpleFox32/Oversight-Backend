var express = require('express');
var router = express.Router();
const { Post, User, games } = require('../models');
var auth = require('../services/auth');

//--------------------------------------------------
/* GET /:id get individual post */
router.get('/:id', (req, res, next) => {
  const postId = parseInt(req.params.id);

  Post.findOne({
    where: {
      id: postId,
    },
    include: User,
  }).then(
    (thePost) => {
      if (thePost) {
        res.json(thePost);
      } else {
        res.status(404).send();
      }
    },
    (err) => {
      res.status(500).send(err);
    }
  );
});

// GET all
router.get('/search/:query', (req, res, next) => {
  const postId = parseInt(req.params.id);

  games
    .findAll({
      where: {
        //Name: req.params.query,
        [Op.or]: [{ Name: { [Op.like]: '%' + req.params.query + '%' } }],
      },
    })
    .then(
      (rows) => {
        if (rows) {
          res.json(rows);
        } else {
          res.status(404).send();
        }
      },
      (err) => {
        res.status(500).send(err);
      }
    );
});

// GET all
router.get('/', (req, res, next) => {
  const postId = parseInt(req.params.id);

  games.findAll().then(
    (rows) => {
      if (rows) {
        res.json(rows);
      } else {
        res.status(404).send();
      }
    },
    (err) => {
      res.status(500).send(err);
    }
  );
});

module.exports = router;
