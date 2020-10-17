const express    = require('express'),
      app        = express(),
      port       = process.env.PORT || 3000,
      dbUrl      = process.env.DATABASEURL || 'mongodb+srv://bishop:bishop@restfulcluster.creso.mongodb.net/mega_byte_dev',
      mongoose   = require('mongoose'),
      bodyParser = require('body-parser'),
      router     = require('./api/router');

// Remember to remove the dev dburl before pushing to git

mongoose.connect(dbUrl, {useNewUrlParser: true, useUnifiedTopology: true});

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));


router(app);

app.listen(port, process.env.IP, () => console.log('listening on port: ' + port));



      