var validator = require('validator');
var db = require('../conf/database');


module.exports = {
   usernameCheck: function(req, res, next) {
       var {username} = req.body;
       username = username.trim();
       if(!validator.isLength(username, {min:3})){
           req.flash("error","Username must be 3 or more characters");
       }
       if(!/[a-zA-Z]/.test(username.charAt(0))){
           req.flash("error","Username must begin with a character");
       }
       if(req.session.flash.error){
           res.redirect('/registration');
       }else{
           next();
       }
   },


   passwordCheck: function(req, res, next) {
       var {password} = req.body;
       if(!validator.isLength(password, {min:8})){
           req.flash("error","Password must be 8 or more characters,");
       }
       if(!/[a-z]/.test(password)){
           req.flash("error","Password must contain at least one lowercase letter");
       }
       if(!/[A-Z]/.test(password)){
           req.flash("error","Password must contain at least one uppercase letter");
       }
       if(!/\d/.test(password)){
           req.flash("error","Password must contain at least one number");
       }
       if(!/[\!\@\#\$\%\^\&\*]/.test(password)){
           req.flash("error","Password must contain at least one symbol");
       }
       if(req.session.flash.error){
           res.redirect('/registration');
       }else{
           next();
       }
   },

   confirmPasswordCheck: function(req, res, next) {
    var { password, confirmPassword } = req.body;
    if (password !== confirmPassword) {
      req.flash("error", "Passwords do not match");
    }
    if(req.session.flash.error){
      res.redirect("/registration");
    } else {
      next();
    }
  },


   emailCheck: function(req, res, next) {
       var {email} = req.body;
       if(!validator.isEmail(email)){
           req.flash("error","Please enter a valid email address");
       }
       if(req.session.flash.error){
           res.redirect('/registration');
       }else{
           next();
       }
   },


   tosCheck: function(req, res, next) {
    var {tos} = req.body;
    if(!tos || tos !== "on"){
        req.flash("error", "Please accept the terms of service");
    }
    if(req.session.flash.error){
        res.redirect('/registration');
    }else{
        next();
    }
},


   ageCheck: function(req, res, next) {
       var {age} = req.body;
       if(!validator.isInt(age, {min: 13})){
           req.flash("success");
       }
       if(req.session.flash.error){
           res.redirect('/registration');
       }else{
           next();
       }
   },


   isUsernameUnique: async function (req, res, next) {
       var {username} = req.body;
       try{
           var [rows, fields] = await db.execute(
               `SELECT id FROM users WHERE username=?;`,
               [username]
           );
           if(rows && rows.length > 0){
               req.flash("error", `${username} is already taken`);
               return req.session.save(function (err){
                   return res.redirect('/registration');
               });
           } else {
               next();
           }
       } catch (error) {
           next(error);
       }
   },


   isEmailUnique: async function (req, res, next) {
       var {email} = req.body;
       try{
           var [rows, fields] = await db.execute(
               `SELECT id FROM users WHERE email=?;`,
               [email]
           );
           if(rows && rows.length > 0){
               req.flash("error", `${email} is already taken`);
               return req.session.save(function (err){
                   return res.redirect('/registration');
               });
           } else {
               next();
           }
       } catch (error) {
           next(error);
       }
   },
};
