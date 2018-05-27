var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/word-a-day")

var postSchema = new mongoose.Schema({
  word: String,
  sinhalaMeaning: String,
  englishMeaning: String,
  sinhalaExample: String,
  englishExample: String,
  previousPost: ObjectId,
  nextPost: ObjectId,
  createdDate: { type: Date, default: Date.now }
});
var Post = mongoose.model('Post', postSchema);

/* Save post and redirect */
router.post('/addpost', (req, res, next) => {
  var postData = new Post({
    word: req.body.word,
    sinhalaMeaning: req.body.sinhalaMeaning,
    englishMeaning: req.body.englishMeaning,
    sinhalaExample: req.body.sinhalaExample,
    englishExample: req.body.englishExample
  });
  postData.save().then( result => {
    previousPost = Post.find().sort({$natural: -1}).limit(1);
    
    res.redirect('/');
  }).catch(err => {
    res.status(400).send("Unable to save data");
  });
});

/* New post */
router.get('/newpost', function(req, res, next) {
  res.render('newpost', {title: 'New Post'});
});

/* list posts */
router.get('/', function(req, res, next) {
  Post.find({}, (err, posts) => {
    res.render('index', {posts: posts, title: "posts"});
  });
});

module.exports = router;
