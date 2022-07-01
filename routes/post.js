var express = require('express');
var router = express.Router();
const { Post } = require('../models');
var auth = require('../services/auth');

/* POST create a post */
router.post('/:id', async (req, res, next) => {

  let token = req.localStorage.token;
  if (token) {
    auth.verifyUser2(token).then((user) => {

      if (!user) {
        res.status(403).send();
        return;
      }

      // create a post with the userid
      Post.create({
        post: req.body.body,
        UserUserId: user.user_id,
        postGameId: req.params.id,
      })
        .then((newPost) => {
          res.json(newPost);
        })
        .catch(() => {
          res.status(400).send();
        });
    });
  }
});

/* POST create a post */
router.post('/create/:id', async (req, res, next) => {

  console.log(req.body);
  console.log(req.params.id);

  // create a post with the userid
  Post.create({
    post: req.body.post,
    GameId: req.params.id,
  })
    .then((newPost) => {
      res.json(newPost);
    })
    .catch(() => {
      res.status(400).send();
    });
});

//--------------------------------------------------

module.exports = router;
