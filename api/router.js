const Meal = require('../models/meal');


module.exports = app => {
    app.get('/', (req, res) => {
        res.render('landing');
    });

    
    // Read Route
    app.get('/meals', (req, res) => {
        Meal.find({}, (err, meals) => {
            if (err) {
                console.log(err);
            } else {
                res.render('index', {meals: meals});
            }
        })
    });

    app.get('/meals/new', (req, res) => {
        res.render('new');
    })

    // Create route
    app.post('/meals', (req, res) => {
        Meal.create(req.body.meal, (err, meal) => {
            if (err) {
                console.log(err);
            } else {
                res.redirect('/meals');
            }
        });
    });

    // Show route
    app.get('/meals/:id', (req, res) => {
        Meal.findById(req.params.id)
        .then(meal => res.render('show', {meal: meal}))
        .catch(err => console.log(err));
    });

    // Edit route
    app.get('/meals/:id/edit', (req, res) => {
        Meal.findById(req.params.id)
        .then(meal => res.render('edit', {meal: meal}))
        .catch(err => console.log(err));
    });
}