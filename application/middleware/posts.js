var pathToFFMPEG = require('ffmpeg-static');
var exec = require('child_process').exec;
const db = require('../conf/database');


module.exports = {
   makeThumbnail: function(req, res, next){
       if(!req.file){
           next(new Error('File upload failed'));
       }else{
           try{
               var destinationOfThumbnail = `public/images/uploads/thumbnail-${req.file.filename.split(".")[0]}.png`
               var thumbnailCommand = `${pathToFFMPEG} -ss 0:01 -i ${req.file.path} -y -s 200x200 -vframes 1 -f image2 ${destinationOfThumbnail}`;
               exec(thumbnailCommand);
               req.file.thumbnail = destinationOfThumbnail;
               next();
           }catch(error){
               next(error);
           }
       }
   },
   getPostsForUserBy: async function(req, res, next) {
      var {userId} = req.session.user;
    try {
      var[rows, _ ] = await db.execute(`SELECT * FROM posts where fk_userid=?;`,[userId]);
      if(rows && rows.length == 0){
         req.flash("error", "This user has no posts");
         return res.render('profile');
      }else{
         req.flash("success", "This user has posts");
         res.locals.posts = rows;
         return res.render('profile');
      }
    } catch (error) {
       next(error);
    }
 },
  
 getPostById: async function(req, res, next) {
    var {id} = req.params;
    try {
      let [rows, _ ] = await db.execute(
          `select u.username, p.video, p.title, p.description, p.id, p.createdAt
          from posts p
          JOIN users u
          ON p.fk_userId=u.id
          WHERE p.id=?;`,
      [id]
      );
      const post = rows[0];
      if(!post){
      }else{
         res.locals.currentPost = post;
         next();
      }
    } catch (error) {
       next(error);
    }
 },
 
  
 getRecentPostComments: async function(req, res, next) {
   var {id} = req.params;
   try {
     let [rows, _ ] = await db.execute(
         `select u.username, c.text, c.createdAt
         from comments c
         JOIN users u
         ON c.fk_authorId=u.id
         WHERE c.fk_postId=?;`,
     [id]
     );

   
        res.locals.currentPost.comments = rows;
        next();
     
   } catch (error) {
      next(error);
   }
},

  
 getRecentPosts: async function(req, res, next) {
    try {
      const query = 'SELECT * FROM posts ORDER BY createdAt DESC LIMIT 8';
      const [rows] = await db.query(query);
      res.locals.posts = rows;
      next();
    } catch (error) {
      next(error);
    }
 }
};
   

  
