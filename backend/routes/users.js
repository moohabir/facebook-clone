const router = require('express').Router();
let User = require('../databaseModals/user.modal');
const jwt = require('jsonwebtoken');
const bcrpt = require('bcrypt');

require('dotenv').config();

router.get('/', (req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => console.log(err));
}),
  //router.post('/register', async (req, res) => {
  // try {
  // const salt = await bcrpt.genSalt(10);
  //const hashedPassword = await bcrpt.hash(req.body.password, salt);

  //const newUser = new User({
  //  username: req.body.username,
  //email: req.body.email,
  // password: hashedPassword,
  // });

  //const user = await newUser.save();
  // res.status(200).json(user);
  // } catch (err) {
  // console.log(err);
  //}
  // });

  router.post('/register', async (req, res) => {
    //const salt = await bcrpt.genSalt(10);
    //const hashedPassword = await bcrpt.hash(req.body.password, salt);
    console.log(req.body);
    // res.json({message: req.body});
    //password: hashedPassword;
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res
        .status(422)
        .json({ error: 'Please filled the field correctly' });
    }

    try {
      const userExist = await User.findOne({ username: username });
      if (userExist) {
        return res.status(422).json({ error: 'Username already Exist' });
      }
      const emailExist = await User.findOne({ email: email });
      if (emailExist) {
        return res.send({ message: 'Email Already Exist !!!' });
      }
      //if (userExist && emailExist ) {
      // res.send({ message: ' Username and Email Already Exist !!!' });
      //return res
      // .status(422)
      // .json({ error: ' Username and email already Exist' });
      //}

      const user = new User({ username, email, password });
      await user.save();
      res.send(200).json(user);
    } catch (err) {
      console.log('showing errors', err);
    }
  });

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(422)
      .json({ error: 'Please fill all the fields correctly' });
  }
  try {
    const user = await User.findOne({
      email: req.body.email,
    });
    if (!user) {
      res.status(404).json('User not found');
      const validPassword = await bcrpt.compare(
        req.body.password,
        user.password
      );
      !validPassword && res.status(400).json('wrong password');
    }

    const emailExist = await User.findOne({ email: email });
    if (emailExist) {
      return res.status(200).json({ success: 'correct email' });
    }

    const accessToken = jwt.sign({ User }, process.env.ACCESS_TOKEN_SECRET);
    res.json({
      accessToken: accessToken,
    });

    const token = req.headers['x-auth-token'];
    if (!token)
      return res
        .status(401)
        .json({ error: 'true', msg: 'no authentication token' });

    const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);
    if (!verifiedToken)
      return res.status(401).json({ error: 'true', msg: 'token failed' });

    req.user = verifiedToken.id;

    res.status(200).json(user);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
