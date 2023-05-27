var express = require('express');
const { isLoggedIn, isMyProfile } = require('../middleware/auth');
const { getRecentPosts } = require('../middleware/posts');
const { getPostsForUserBy } = require('../middleware/posts');
var router = express.Router();
router.use(function(req,res,next){
  req.userIsLoggedIn = true;
  next();
})

router.use('/postvideo', function(req,res, next)
{
  if(req.userIsLoggedIn){
    next();
  }else{
    res.redirect('/login');
    }
  })

  router.get('/logout', function(req, res, next){
    req.session.destroy(function(err){
      if(error)
      {
        next(error);
      }
      else
      {
        return res.redirect('/');
      }
    })
  });
  

 router.get('/', getRecentPosts, function(req, res, next) {
  res.render('index', { title: 'CSC 317 App', name:"Ken Chika", recentPosts: res.locals.recentPosts });
});
router.get('/login', function(req,res){
  res.render('login', {title: 'Login' , css:["style.css"]});
});
router.get('/registration', function(req,res){
  res.render('registration', {title: 'Registration' , css:["style.css"]}); 
});
router.get('/postvideo', isLoggedIn ,function(req,res){
  res.render('postvideo', {title: 'Post Video'})
});

module.exports = router;