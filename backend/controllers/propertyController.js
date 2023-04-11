const Property = require('../models/propertyModel');
const mongoose = require('mongoose');

//get all properties
const getAllProperties = async (req, res) => {
    const user_id = req.user._id;

    const properties = await Property.find({user_id}).sort({createdAt: -1})
    res.status(200).json(properties)
}

//get a single property
const getSingleProperty = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({err: 'Property not found'})
    }

    const property = await Property.findById(id)
    if(!property){
        return res.status(404).json({err: 'Property not found'})
    }
    res.status(200).json(property)
}

//create a property
const createProperty = async (req, res) => {
    const { name, address, city, state, zip } = req.body;

    let emptyFields = [];

    if(!name){
        emptyFields.push('name')
    }
    if(!address){
        emptyFields.push('address')
    }
    if(!city){
        emptyFields.push('city')
    }
    if(!state){
        emptyFields.push('state')
    }
    if(!zip){
        emptyFields.push('zip')
    }
    if(emptyFields.length > 0){
        return res.status(400).json({err: 'Please fill in all fields', emptyFields})
    }

    //add doc to DB
    try{
        const user_id = req.user._id
        const property = await Property.create({name, address, city, state, zip, user_id})
        res.status(200).json(property)
    }catch(err){
        res.status(400).json({err: err.message})
    }
}

//delete a property
const deleteProperty = async (req, res) => {
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({err: 'Property not found'})
    }
    const property = await Property.findOneAndDelete({_id: id})

    if(!property){
        return res.status(404).json({err: 'Property not found'})
    }

    res.status(200).json(property)
}


//update a property
const updateProperty = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({err: 'Property not found'})
    }

    const property = await Property.findOneAndUpdate({_id:id}, {
      ...req.body  
    })

    if(!property){
        return res.status(404).json({err: 'Property not found'})
    }

    res.status(200).json(property)
}

module.exports = {
    getAllProperties,
    getSingleProperty,
    createProperty,
    deleteProperty,
    updateProperty
}