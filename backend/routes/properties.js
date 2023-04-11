const express = require('express');
const {
    createProperty,
    getAllProperties,
    getSingleProperty,
    deleteProperty,
    updateProperty
} = require('../controllers/propertyController')
const requireAuth = require('../middleware/requireAuth')


const router = express.Router();

//require auth for all workout routes
router.use(requireAuth)

//GET all workouts
router.get('/', getAllProperties)

//GET a single workout
router.get('/:id', getSingleProperty)

//POST a workout
router.post('/', createProperty)

//Delete a workout
router.delete('/:id', deleteProperty)

//Update a workout
router.patch('/:id', updateProperty)


module.exports = router;