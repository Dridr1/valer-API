import joi from "joi";

const newCardSchema = joi.object({
    type: joi.string().valid('groceries', 'restaurant', 'transport', 'education', 'health').required()
});

export default newCardSchema;