const express = require('express');
const mongoose=require('mongoose');
const cookieSession=require('cookie-session');
const passport=require('passport');
const keys=require('./config/keys');
require('./models/User');
require('./services/passport');

mongoose.connect(keys.mongoURI);
const app = express();
app.use(
    cookieSession({
        maxAge: 30*24*60*60*1000,
        keys: [keys.cookieKey],
    })
);
app.use(passport.initialize());
app.use(passport.session());
require('./routes/authRoutes') (app);
 //or we can do require('./routes/authRoutes') (app)  bcz this require return a funciton. and immediately we put app as input. this is Vaild JS.  or we do const authRoutes=require('./routes/authRoutes'); authRoutes(app);
const PORT=process.env.PORT || 5000;
app.listen(PORT);
// app.listen (5000);  this is to run the project on site
// on command line , node index.js   