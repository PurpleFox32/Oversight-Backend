var express = require('express');
var router = express.Router();
const { User } = require('../models');
var bcrypt = require('bcrypt');
var auth = require('../services/auth');
let cors = require('cors');

router.use(cors());

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

//---------------------------------------------------------

/* POST Register user and create a user */
router.post('/signup', async (req, res, next) => {
  // verifing user&password do not equal null
  if (!req.body.username || !req.body.password) {
    res.status(400).send('Username and Password Required');
    return;
  }
  // hash the password
  // salt = the number of times the encryption runs
  // higher the salt number the greater the encrytion
  // const salt = await bcrypt.genSalt(10);
  // const hashedPassword = await bcrypt.hash(req.body.password, salt);

  User.findOrCreate({
    where: { username: req.body.username },
    defaults: {
      email: req.body.email,
      // password: hashedPassword,
      password: auth.hashPassword(req.body.password),
    },
  })
    .then((newUser) => {
      res.json({
        //only returning userid & username
        id: newUser.user_id,
        username: newUser.username,
      });
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

// POST Login
router.post('/login', async (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

  User.findOne({
    where: {
      username: req.body.username,
    },
  }).then((user) => {
    // check if user exists
    if (!user) {
      res.status(404).send('Login failed');
      return;
    } else {
      let passwordMatch = auth.comparePasswords(
        req.body.password,
        user.dataValues.password
      );

      if (passwordMatch) {
        let token = auth.signUser(user);
        res.json(token);
      }
    }
    // // check the password
    // // compare returs a boolean
    // const valid = await bcrypt.compare(req.body.password, user.password);

    // if (valid) {
    //   // create the token
    //   const jwt = auth.createJWT(user);
    //   res.status(200).send({ jwt, user });
    // } else {
    //   res.status(401).send('Invalid Password');
    // }
  });
});

router.post('/profile', (req, res) => {
  let token = req.body.token;
  console.log(token);
  res.json('hi');

  // if (token) {
  //   auth.verifyUser(token).then((user) => {
  //     // make a find one in the models
  //   });
  // }

  if (token) {
    auth.varifyUser2(token).then((user) => {
      // console.log(user);
    });
  }
});

//-----------------------------------------------------------

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
