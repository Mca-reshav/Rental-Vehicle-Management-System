const Joi = require('joi');

module.exports = {
    add: Joi.object({
        name: Joi.string().min(2).max(50).required(),
        model: Joi.string().min(2).max(200).required(),
        rentalPrice: Joi.number().min(1).max(10000).required(),
    }),
    remove: Joi.object({
        vehicleId: Joi.string().required(),
    }),
    edit: Joi.object({
        vehicleId: Joi.string().required(),
        name: Joi.string().min(2).max(50).optional(),
        model: Joi.string().min(2).max(200).optional(),
        rentalPrice: Joi.number().min(1).max(10000).optional(),
    }),
    getList: Joi.object({
        searchText: Joi.string().min(1).optional(), 
        page: Joi.number().min(0).max(25).optional(), 
        limit: Joi.number().min(0).max(25).optional(),
        search: Joi.string().min(1).optional(), 
        sortField: Joi.string().min(1).optional()
    }),
    toggle: Joi.object({
        vehicleId: Joi.string().required(),
        password: Joi.string().min(3).max(25).required()
    }),}