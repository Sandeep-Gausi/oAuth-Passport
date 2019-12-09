const express = require('express');
const authRoutes = require('./routes/auth-routes');
const passportSetup = require('./config/passport-setup');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const keys = require('./config/keys');
const passport = require('passport');
const profileRoutes = require('./routes/profile-routes');




const app = express();

// Set up view
app.set('view engine', 'ejs');


app.use(cookieSession({
    maxAge: 24* 60* 60* 1000,
    keys:[keys.session.cookieKey]
}));

// initialize passport
app.use(passport.initialize());
app.use(passport.session());


// //Connect mongodb
// mongoose.connect('mongodb://localhost/oAuth', { useNewUrlParser: true, useUnifiedTopology:true },()=>{
//     console.log('Connected to mongodb');
// });

mongoose.connect(keys.mongodb.dbURI, { useNewUrlParser: true, useUnifiedTopology:true }, () => {
    console.log('connected to mongodb');
});

// set up routes
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);


app.get('/', (req, res) => {
    res.render('home',{ user: req.user });
});

app.listen(3000,function(){
    console.log("listing to port 3000");
});