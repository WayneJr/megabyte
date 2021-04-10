const Meal = require('../../models/meal');

function mealIndex(req, res) {
    Meal.find({}, (err, meals) => {
        if (err) {
            console.log(err);
        } else {
            res.render('meals/index', {meals: meals});
        }
    });
}

function mealNew(req, res) {
    res.render('meals/new');
}

function createMeal(req, res) {
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

}

function mealShow(req, res) {
    Meal.findById(req.params.id)
    .populate('comments')
    .exec()
    .then(meal => {
        res.render('meals/show', {meal: meal});
    })
    .catch(err => console.log(err));
}

function mealEdit(req, res) {
    Meal.findById(req.params.id)
    .then(meal => res.render('meals/edit', {meal: meal}))
    .catch(err => console.log(err));
}

function mealUpdate(req, res) {
    Meal.findByIdAndUpdate(req.params.id, req.body.meal)
    .then(meal => {
        req.flash('success', 'Meal updated');
        res.redirect('/meals/'+ req.params.id);
    })
    .catch(err => console.log(err));
}

function mealDelete(req, res) {
    Meal.findByIdAndDelete(req.params.id)
    .then(() => {
        req.flash('success', 'Successfully deleted meal');
        res.redirect('/meals');
    })
    .catch(err => console.log(err));
}

module.exports = {mealIndex, mealNew, createMeal, mealShow, mealEdit, mealUpdate, mealDelete};