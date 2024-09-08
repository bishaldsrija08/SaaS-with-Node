//Requires start here

require("dotenv").config();
const express = require("express")
const app = express()
const passport = require("passport")

//Requires end here

//Middlewares start here

app.set("view engine", "ejs")
app.use(passport.initialize())
app.use(passport.session())
passport.serializeUser(function(user,cb){
    cb(null, user) //cb(error, success) --> cb(error)
})
passport.deserializeUser(function(obj, cb){
    cb(null, obj)
})

//Middlewarees end here


//Database connection
require("./model/index")
app.get("/", (req, res)=>{
    res.render("home")
})

const PORT =  process.env.PORT || 4000
app.listen(PORT, ()=>{
    console.log(`Server has started at port ${PORT}`)
})

//Google login here
var userProfile;
let GoogleStrategy = require("passport-google-oauth").OAuth2Strategy

passport.use(new GoogleStrategy({
    clientID:process.env.CLIENT_ID,
    CliendSecrete: process.env.CLIENT_SECRET,
    callbackURL: "https://localhost:3000/auth/google/callback"
},
function(accessToken, refreshToken, profile, done, cb){
    console.log(profile)
userProfile = profile
return done(null, userProfile)
}))

app.get("/auth/google",passport.authenticate("google",{scope: ['profile', 'email']}))

app.get("/auth/google/callback", passport.authenticate("google",{
    failureRedirect: "http://localhost:3000"
}),
function (req, res){
res.send("Logged in Successfully!")
}
)
//google login end here
