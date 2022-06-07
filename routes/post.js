var express = require('express');
var router = express.Router();
const { Post } = require('../models');
var auth = require('../services/auth');

/* POST create a post */
router.post('/', async (req, res, next) => {
  // validate token / get user
  const user = req.user;

  if (!user) {
    res.status(403).send();
    return;
  }

  // create a post with the userid
  Post.create({
    post: req.body.post,
    UserId: user.id,
  })
    .then((newPost) => {
      res.json(newPost);
    })
    .catch(() => {
      res.status(400).send();
    });
});

/* PUT update a post */

// get the user from jwt

// get the post already from database

// compare the user's userid to the token user id

//--------------------------------------------------
/* GET /:id get individual post */
router.get('/:id', (req, res, next) => {
  const postId = parseInt(req.params.id);

  Post.findOne({
    where: {
      id: postId,
    },
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

module.exports = router;
