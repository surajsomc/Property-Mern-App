const express = require('express');
const {
    createProperty,
    getAllProperties,
    getSingleProperty,
    deleteProperty,
    updateProperty
} = require('../controllers/propertyController')
const requireAuth = require('../middleware/requireAuth')


const router_2 = express.router();

//require auth for all properties routes
router_2.use(requireAuth)

//GET all properties
router_2.get('/', getAllProperties)

//GET a single properties
router_2.get('/:id', getSingleProperty)

//POST a properties
router_2.post('/', createProperty)

//Delete a properties
router_2.delete('/:id', deleteProperty)

//Update a properties
router_2.patch('/:id', updateProperty)


module.exports = router_2;