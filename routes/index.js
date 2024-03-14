// routes/index.js

const express = require('express');
const passport = require('passport');
const router = express.Router();
const userModel = require("./users");
const localStrategy = require("passport-local")
// const doctorModel = require("./doctor");
const aptModel =require("./appointment")
const upload = require('./multer');

// Passport local strategy for users
passport.use(new localStrategy(userModel.authenticate()));
// passport.use('doctor-local', new localStrategy(doctorModel.authenticate()));

// Passport local strategy for sellers
// passport.use('doctor-local', new localStrategy({
//     usernameField: 'email',
//     passwordField: 'password',
//   }, (email, password, done) => {
//     doctorModel.findOne({ email: email }, (err, doctor) => {
//       if (err) { return done(err); }
//       if (!doctor) { return done(null, false, { message: 'Incorrect email.' }); }
//       if (doctor.password !== password) { return done(null, false, { message: 'Incorrect password.' }); }
//       return done(null, doctor);
//     });
//   }));

// Routes for user authentication
router.get('/',function(req,res){
    res.render('index');
});

router.get('/profile',isLoggedIn,async function(req,res){
    const user = await userModel.findOne({username:req.session.passport.user})
    console.log(user)

    res.render('profile',{user});
});

router.get('/login',function(req,res){
    res.render('login');
});

router.get('/signup',function(req,res){
    res.render('signup');
});

router.post('/register',function(req,res){
    var userdata = new userModel({
        username: req.body.username,
        number: req.body.number,
        email: req.body.email,
        name: req.body.name,
        dob:req.body.dob,
        gender:req.body.gender
    });
    userModel.register(userdata, req.body.password)
    .then(function(registereduser){
    passport.authenticate("local")(req,res,function(){
        res.redirect('/profile');
    });
});

});

router.post('/login',passport.authenticate("local",{
    successRedirect: "/profile",
    failureRedirect: "/"
}),function(req,res){
    
});
router.get("/doctor",(req,res)=>{
    res.render("doctor");
})
router.get("/logout",function(req,res,next){
    req.logout(function(err){
        if(err) return next(err);
        res.redirect("/");
    });
});
router.get("/appointment",(req,res)=>{
    res.render("appointment")
})
router.get("/bookbed",(req,res)=>{
    res.render("bookbed")
})

router.get("/ambulance",(req,res)=>{
    res.render("ambulance")
})
router.get("/treatment",(req,res)=>{
    res.render("treatment")
})

router.post("/pic",isLoggedIn,upload.single("profileImage"),async (req,res)=>{
    const user = await userModel.findOne({username:req.session.passport.user})
    user.profileImage = req.file.filename;
    await user.save();
    res.redirect('/profile')
})

// // Routes for doctor authentication
// router.get('/slogin', (req, res) => {
//     res.render('slogin');
// });

// router.post('/slogin', passport.authenticate('doctor-local', {
//     successRedirect: '/profile',
//     failureRedirect: '/slogin',
// }));

// router.get('/ssignup', (req, res) => {
//     res.render('ssignup');
// });

// router.post('/sregister',function(req,res){
//     var sellerdata = new doctorModel({
//         username: req.body.username,
//         email: req.body.email,
//         name: req.body.name
//     });
//     doctorModel.register(sellerdata, req.body.password)
//     .then(function(registeredseller){
//     passport.authenticate("doctor-local")(req,res,function(){
//         res.redirect('/doctor-profile');
//     });
// });

// });

// router.get('/profile', (req, res) => {
//     res.render('profile');
// });

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/');
}

module.exports = router;
