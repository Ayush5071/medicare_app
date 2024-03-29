// routes/index.js

const express = require('express');
const passport = require('passport');
const router = express.Router();
const userModel = require("./users");
const localStrategy = require("passport-local")
// const doctorModel = require("./doctor");
const aptModel =require("./appointment")
const upload = require('./multer');
const ambulanceModel = require("./ambulance")
const bedModel = require("./bed")
const pathModel = require("./pathalogy")

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
router.get("/bot",(req,res)=>{
    res.render("chatbot")
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
router.get("/s-ambulance",isLoggedIn,async (req,res)=>{
    const user = await userModel.findOne({username : req.session.passport.user}).populate("ambulance")

    res.render("ambulancestatus",{user})
})
router.get("/s-bed",isLoggedIn,async(req,res)=>{
    const user = await userModel.findOne({username : req.session.passport.user}).populate("bed")
    res.render("bedstatus",{user})
});
router.get("/s-appointment",isLoggedIn,async(req,res)=>{
    const user = await userModel.findOne({username : req.session.passport.user}).populate("appointment")
    res.render("appointmentstatus",{user})
});
router.get("/pathology",isLoggedIn,async(req,res)=>{
    const user = await userModel.findOne({username : req.session.passport.user}).populate("test")
    res.render("testreq",{user})
});
router.get("/pathform",isLoggedIn,async(req,res)=>{
    const user = await userModel.findOne({username : req.session.passport.user}).populate("test")
    res.render("pathology",{user})
});

router.post("/appointment",isLoggedIn,async(req,res)=>{
    const user = await userModel.findOne({username:req.session.passport.user})
    console.log(user)
    const appointment = await aptModel.create({
        name:req.body.name,
        email:req.body.email,
        phone:req.body.phone,
    })
    user.appointment.push(appointment._id);
    await user.save()
    console.log(user)
    res.redirect("/cnfrm")
})
module.exports = router;
router.post("/book-bed",isLoggedIn,async(req,res)=>{
    const user = await userModel.findOne({username:req.session.passport.user})
    console.log(user)
    const bed = await bedModel.create({
        name:req.body.name,
        email:req.body.email,
        phone:req.body.phone,
    })
    user.bed.push(bed._id);
    await user.save()
    res.redirect("/cnfrm")
})
router.post("/book-ambulance",isLoggedIn,async(req,res)=>{
    const user = await userModel.findOne({username:req.session.passport.user})
    console.log(user)
    const ambulance = await ambulanceModel.create({
        name:req.body.name,
        email:req.body.email,
        phone:req.body.phone,
        address:req.body.address
    })
    user.ambulance.push(ambulance._id);
    await user.save()
    res.redirect("/cnfrm")
})
router.post("/pathalogy",isLoggedIn,async (req,res)=>{
    const user = await userModel.findOne({username:req.session.passport.user})
    // console.log(user)
    const pathalogy = await pathModel.create({
        name:req.body.name,
        email:req.body.email,
        phone:req.body.phone,
        date:req.body.date,
        test:req.body.test
    })
    user.test.push(pathalogy._id);
    await user.save()
    res.redirect("/cnfrm")

})
module.exports = router;
