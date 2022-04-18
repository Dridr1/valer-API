import joi from "joi";

const existentCardSchema = joi.object({
    securityCode: joi.string().required().pattern(/^([0-9]{3})$/),
    password: joi.string().required().pattern(/^([0-9]{4})$/)
});

export default existentCardSchema;