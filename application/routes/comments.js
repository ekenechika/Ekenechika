var express = require('express');
var router = express.Router();
var { isLoggedIn } = require('../middleware/auth');
var db = require('../conf/database');

router.post('/create', isLoggedIn, async function (req, res, next) {
  var { userId, username } = req.session.user;
  var { postId, comment } = req.body;

  try {
    var [insertResult, _] = await db.execute(`INSERT INTO comments (text, fk_postId, fk_authorId) VALUES (?, ?, ?)`, [comment, postId, userId]);

    if (insertResult && insertResult.affectedRows == 1) {
      var commentId = insertResult.insertId;
      var createdAt = new Date().toLocaleString
      ("en-us",{
        dateStyle:"long",
        timeStyle:"medium"
      }); // Replace this with the actual creation date of the comment

      return res.status(201).json({
        commentId: commentId,
        username: username,
        commentText: comment,
        createdAt: createdAt
      });
    } else {
      res.json({
        message: "error"
      });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;