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

//require auth for all properties routes
router.use(requireAuth)

//GET all properties
router.get('/', getAllProperties)

//GET a single properties
router.get('/:id', getSingleProperty)

//POST a properties
router.post('/', createProperty)

//Delete a properties
router.delete('/:id', deleteProperty)

//Update a properties
router.patch('/:id', updateProperty)


module.exports = router;