var express = require('express');
var router = express.Router();
var multer = require('multer');
var db = require('../conf/database');
const { isLoggedIn} = require("../middleware/auth");
const { makeThumbnail, getPostById, getRecentPostComments } = require('../middleware/posts');
const { getRecentPosts } = require('../middleware/posts'); // Import the Post model

const storage = multer.diskStorage({destination: function (req, file, cb) {
  cb(null, "public/videos/uploads");
    },
    filename: function (req, file, cb) {
      var fileExt = file.mimetype.split("/")[1];
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
      cb(null, `${file.fieldname}-${uniqueSuffix}.${fileExt}`);
    },
  });
  const upload = multer({ storage: storage });
router.post(
  "/create",
  isLoggedIn,
   upload.single("uploadVideo"),
    makeThumbnail,
    async function (req, res, next) {
        var { title, description } = req.body;
        var { path, thumbnail } = req.file;
        var { userId } = req.session.user;

        try{
          var [insertResult, _ ] = await db.execute(
              `INSERT INTO posts (title,description, video,thumbnails, fk_userId) VALUE (?,?,?,?,?);`,
              [title, description, path, thumbnail, userId]
          );
          if(insertResult && insertResult.affectedRows){
            req.flash("success", "Your post was created!");
            return req.session.save(function(error){
              if(error) next(error);
              return res.redirect(`/`);
            })
          }else{
            next(new Error('Post could not be created'));
          }
        }catch(error){
          next(error);
        }
    }
);

router.get('/:id(\\d+)',getPostById ,getRecentPostComments ,function (req,res) {
  res.render('viewpost', { title: `View Post ${req.params.id}`});
});



router.get("/search", async function(req, res, next) {
    var { searchValue } = req.query;
    try{
        var [rows, _ ] = await db.execute(
          `select id,title,thumbnails, concat_ws(' ', title, description) as haystack
          from posts
          having haystack like ?;`,
          [`%${searchValue}%`]
        );

        if(rows && rows.length == 0){

        }else{
            res.locals.posts = rows;
            return res.render('index');
        }
        
        }catch(error){
          next(error);
        }
        
});

// Delete post route
router.post('/posts/delete', isLoggedIn, async (req, res, next) => {
  const { postId } = req.body;
  const { userId } = req.session.user;

  try {
    // Check if the post exists and belongs to the current user
    const [post] = await db.execute('SELECT * FROM posts WHERE id = ? AND fk_userId = ?', [postId, userId]);

    if (post.length === 0) {
      return res.status(404).json({ message: 'Post not found or unauthorized' });
    }

    // Delete the post from the database
    await db.execute('DELETE FROM posts WHERE id = ?', [postId]);

    // Return success status
    return res.sendStatus(200);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;