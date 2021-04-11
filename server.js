const { cloudinaryConfig } = require('./config/cloudinary');

require('dotenv').config();


const express    = require('express'),
      app        = express(),
      port       = process.env.PORT || 3000,
      dbUrl      = process.env.DATABASEURL,
      mongoose   = require('mongoose'),
      methodOverride = require('method-override'),
      bodyParser = require('body-parser'),
      flash      = require('connect-flash'),
      passport   = require('passport'),
      LocalStrategy = require('passport-local'),
      session    = require('express-session'),
      mealRoutes     = require('./api/routes/meal'),
      commentRoutes = require('./api/routes/comment'),
      authRoutes = require('./api/routes/index'),
      User       = require('./models/user');

// Remember to remove the dev dburl before pushing to git

mongoose.connect(dbUrl, {useNewUrlParser: true, useUnifiedTopology: true})
.catch(error => console.log(error.reason));

app.set('view engine', 'ejs');
app.use(session({
    secret: "love to eat meat",
    resave: false,
    saveUninitialized: false
}))
app.use(methodOverride('_method'));
app.use(flash());
app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use('*', cloudinaryConfig);

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash('error');
    res.locals.success = req.flash('success');
    next();
});

// router(app);
// routes
app.use('/meals', mealRoutes); // Meal Routes
app.use('/meals/:id/comments', commentRoutes); // Comment Routes
app.use(authRoutes);

app.listen(port, process.env.IP, () => console.log('listening on port: ' + port));



      