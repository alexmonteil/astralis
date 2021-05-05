const baseJoi = require("joi");
const sanitizeHtml = require("sanitize-html");


const extension = joi => ({
    type: "string",
    base: joi.string(),
    messages: {
        "string.escapeHTML": "{{#label}} must not include HTML!"
    },
    rules: {
        escapeHTML: {
            validate(value, helpers) {
                const clean = sanitizeHtml(value, {
                    allowedTags: [],
                    allowedAttributes: {}
                });
                if (clean !== value) {
                    return helpers.error("string.escapeHTML", { value });
                }

                return clean;
            }
        }
    }
});



const Joi = baseJoi.extend(extension);


const userSchema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required().escapeHTML(),
    email: Joi.string().email({ minDomainSegments: 2 }).min(10).max(140).required().escapeHTML(),
    password: Joi.string().pattern(new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,}$/)).required()
});



const starportSchema = Joi.object({
    starport: Joi.object({
        title: Joi.string().required().escapeHTML(),
        price: Joi.number().required().min(0),
        location: Joi.string().required().escapeHTML(),
        description: Joi.string().required().escapeHTML()
    }).required(),
    deleteImages: Joi.array()
});


const reviewSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number().min(0).max(5).required(),
        body: Joi.string().required().escapeHTML()
    }).required()
});


module.exports = {
    starportSchema,
    reviewSchema,
    userSchema
};