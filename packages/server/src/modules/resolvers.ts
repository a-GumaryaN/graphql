import * as joi from 'joi';
import { removeTags } from '../modules/XSS';
import { customerModel } from '../db/customer-module';
import {
    FindOne,
    Save,
    UpdateOne,
    DeleteOne,
    hasher,
    secretKey
} from './modules';

const registerSchema = joi.object({
    username: joi.string()
        .min(10)
        .required(),
    password: joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .required(),
});

const updateSchema = joi.object({
    firstName: joi.string(),
    lastName: joi.string(),
    phone: joi.string(),
    address: joi.string(),
    age: joi.number(),
});

export const root = {
    login:({username,password})=>{
        const { error } = registerSchema.validate(
            {
                username: username,
                password: password
            });
        if (error) return error;

        const clearUsername = removeTags(username);

    }
}