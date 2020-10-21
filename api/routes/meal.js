const express = require('express');
const router = express.Router();
const Meal = require('../../models/meal');
const {isLoggedIn, checkMealOwnership} = require('../middleware/index');

// Read Route
router.get('/', (req, res) => {
    Meal.find({}, (err, meals) => {
        if (err) {
            console.log(err);
        } else {
            res.render('meals/index', {meals: meals});
        }
    })
});

// New meal form 
router.get('/new', isLoggedIn, (req, res) => {
    res.render('meals/new');
})

// Create route
router.post('/', isLoggedIn, (req, res) => {
    const newMeal = req.body.meal;
    const author = {
        id: req.user._id,
        name: req.user.name,
        username: req.user.username
    };
    newMeal.author = author;
    Meal.create(newMeal, (err, meal) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/meals');
        }
    });
});

// Show route
router.get('/:id', (req, res) => {
    Meal.findById(req.params.id)
    .populate('comments')
    .exec()
    .then(meal => {
        res.render('meals/show', {meal: meal});
    })
    .catch(err => console.log(err));
});

// Edit route
router.get('/:id/edit', checkMealOwnership, (req, res) => {
    Meal.findById(req.params.id)
    .then(meal => res.render('meals/edit', {meal: meal}))
    .catch(err => console.log(err));
});

// Update route
router.put('/:id', checkMealOwnership, (req, res) => {
    Meal.findByIdAndUpdate(req.params.id, req.body.meal)
    .then(meal => {
        req.flash('success', 'Meal updated');
        res.redirect('/meals/'+ req.params.id);
    })
    .catch(err => console.log(err));
});

// Delete Route
router.delete('/:id', checkMealOwnership, (req, res) => {
    Meal.findByIdAndDelete(req.params.id)
    .then(() => {
        req.flash('success', 'Successfully deleted meal');
        res.redirect('/meals');
    })
    .catch(err => console.log(err));
});

module.exports = router;
