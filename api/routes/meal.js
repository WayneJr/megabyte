const express = require('express');
const router = express.Router();

const { mealIndex, mealNew, createMeal, mealEdit, mealShow, mealUpdate, mealDelete } = require('../controllers/meal');
const {isLoggedIn, checkMealOwnership} = require('../middleware/index');

// Read Route
router.get('/', mealIndex);

// New meal form 
router.get('/new', isLoggedIn, mealNew)

// Create route
router.post('/', isLoggedIn, createMeal);

// Show route
router.get('/:id', mealShow);

// Edit route
router.get('/:id/edit', checkMealOwnership, mealEdit);

// Update route
router.put('/:id', checkMealOwnership, mealUpdate);

// Delete Route
router.delete('/:id', checkMealOwnership, mealDelete);

module.exports = router;
