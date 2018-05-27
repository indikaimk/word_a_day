var express = require('express');
var router = express.Router();

/* Save post and redirect */
router.post('/', (req, res, next) => {
  res.redirect('/');
})

module.exports = router;
