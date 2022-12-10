const express = require('express');

const app = express();
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');
const stores = require('./stores');
//const uri = process.env.MONGO_URI
//const port = process.env.PORT || 3001;

//const UserModal = require('./databaseModals/user.modal');

app.use(express.json()); //this is in order post to not make error for pasing
app.use(cors());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const userRouter = require('./routes/users'); //for specific routes to be created for every modal like, Users, Posts, Exercises, Comments etc but this is for users Router
//const outhRouter = require('./routes/outh'); //for specific routes to be created for every modal like, Users, Posts, Exercises, Comments etc but this is for users Router
const postRouter = require('./routes/posts'); //for specific routes to be creat890,-µ,.ø@öpo∆π@œlLüpüü+ö.plppl#Äö900ped for Posts router
//const commentsRouter = require('./routes/comments') //for specific routes to be created for Comments Router.
const commentsRouter = require('./routes/comments');

app.use('/users', userRouter);

//app.use('/users', outhRouter);
app.use('/posts', postRouter);
app.use('/comments', commentsRouter);

app.get('/stores', (req, res) => {
  res.send(stores);
});
app.listen(3001, () => {
  console.log('successful');
});
