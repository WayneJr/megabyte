const express    = require('express'),
      app        = express(),
      port       = process.env.PORT || 3000,
      dbUrl      = process.env.DATABASEURL || 'mongodb+srv://bishop:bishop@restfulcluster.creso.mongodb.net/mega_byte_dev',
      mongoose   = require('mongoose'),
      methodOverride = require('method-override'),
      bodyParser = require('body-parser'),
      passport   = require('passport'),
      LocalStrategy = require('passport-local'),
      session    = require('express-session'),
      router     = require('./api/router'),
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
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



router(app);

app.listen(port, process.env.IP, () => console.log('listening on port: ' + port));



      