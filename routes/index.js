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
router.get("/doctor",isLoggedIn,(req,res)=>{
    res.render("doctor");
})
router.get("/logout",function(req,res,next){
    req.logout(function(err){
        if(err) return next(err);
        res.redirect("/");
    });
});
router.get("/appointment",isLoggedIn,(req,res)=>{
    res.render("appointment")
})
router.get("/bookbed",isLoggedIn,(req,res)=>{
    res.render("bookbed")
})

router.get("/ambulance",isLoggedIn,(req,res)=>{
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
router.get("/cnfrm",(req,res)=>{
    res.render("conformation")
})
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

router.post("/appointment",async(req,res)=>{
    const appointment = await aptModel.create({
        name:req.body.name,
        email:req.body.email,
        phone:req.body.phone,
    })
    res.redirect("/cnfrm")
})
module.exports = router;
