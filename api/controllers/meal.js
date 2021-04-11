const { uploader } = require('../../config/cloudinary');
const { dataUri } = require('../../config/multer');
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
    // Cloudinary image upload

    // console.log(req.file);
    const author = {
        id: req.user._id,
        name: req.user.name,
        username: req.user.username
    };
    const newMeal = {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        author: author
    };

    

    if (req.file) {
        const file = dataUri(req).content;
        return uploader.upload(file).then(async result => {
            console.log(result);
            newMeal.image = result.url;
            console.log(newMeal);
            const theMeal = await Meal.create(newMeal);
            // req.flash('success', 'New Meal Created');
            return res.status(200).redirect('/meals')

            
            // Meal.create(newMeal, (err, meal) => {
            //     if (err) {
            //         console.log(err);
            //     } else {
            //         res.redirect('/meals');
            //     }
            // });

        }).catch(err => res.status(400).json({
              message: "Something went wrong while processing your request",
              data: { err }
          }));
    }

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