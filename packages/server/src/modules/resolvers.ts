import * as joi from 'joi';
import { removeTags } from '../modules/XSS';
import * as jwt from 'jsonwebtoken';
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
    login: async ({ username, password }) => {

        const { error } = registerSchema.validate(
            {
                username: username,
                password: password
            });
        if (error) return error.message;

        const clearUsername = removeTags(username);
        const clearPass = removeTags(password);
        const hashedPassword = hasher('md5', clearPass, 'utf-8', 'hex');

        try {
            const result = await customerModel.findOne({ _id: clearUsername });

            if (!result) return "user not found...";

            if (result.password !== hashedPassword) return 'password not valid';

            const madeToken: string =
                jwt.sign({ username: username }, secretKey, { expiresIn: "120s" });

            return madeToken;

        } catch (err) {
            return err
        }

        return "ERR"

    }
}