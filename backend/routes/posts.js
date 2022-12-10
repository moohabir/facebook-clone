const router = require('express').Router();
let Post = require('../databaseModals/post.modal');
//const jwt = require('jsonwebtoken');

//soo import garee user authencation si only user availble uu u post gareyn karo
//let User = require('../databaseModals/user.modal');

//router.route('/').get(AuthenticateToken, (req, res) => {
router.route('/').get((req, res) => {
  Post.find()
    .then(
      (posts) => res.json(posts)
      //res.json(posts.filter((post) => post.name === req.user.name))
    )
    .catch((err) => console.log(err));
}),
  router.route('/add').post((req, res) => {
    //jwt.verify(req.token, process.env.ACCESS_TOKEN_SECRET, (err, authData) => {
    //if (err) {
    // res.sendStatus('User not loggedin');
    //} else {
    //   res.json({
    // message: 'post created by the user',
    //  authData,
    // });
    // }
    // });
    const username = req.body.username;
    const description = req.body.description;
    //const duration = Number(req.body.duration);
    /// const date = Date.parse(req.body.date);

    const newPost = new Post({
      username,
      description,
      //duration,
      // date,
    });

    newPost
      .save()
      .then(() => res.json('new post posted'))
      .catch((err) => console.log(err));
  });

router.route('/delete/:id').delete((req, res) => {
  Post.findByIdAndDelete({ _id: req.params.id })
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
});

router.route('/update/:id').put((req, res) => {
  Post.findByIdAndUpdate(
    { _id: req.params.id },
    {
      username: req.body.username,
      description: req.body.description,
      duration: req.body.duration,
      date: req.body.date,
    }
  )
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
});

//function AuthenticateToken(req, res, next) {
//const authHeader = req.Headers('authorization');
//const token = authHeader.split(' ')[1];
//if (token == null) res.sendStatus(401);

//jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
// if (err) res.sendStatus(403);
//res.redirect('/');
//req.user = user;
//return next();
//});
//}

module.exports = router;
