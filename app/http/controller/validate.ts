"use strict";

import * as Joi from "joi";
import { IUser } from "../interface/user.interface";
import { IProject } from "../interface/project.interface";
import { ICard } from "../interface/card.interface";

interface Login {
    email: string,
    password: string
}

interface PasswordForgot {
    email: string
}

interface PasswordReset extends PasswordForgot {
    password: string,
    otp: string
}

export class Validator {
    constructor() { }

    // ************************* USER ******************** //


    // validate user register data
    validateRegisterData(data: IUser) {
        const schema = Joi.object().keys({
            username: Joi.string().required(),
            password: Joi.string().required(),
            address: Joi.string().required(),
            email: Joi.string().required(),
            name: Joi.string().required(),
        });
        return Joi.validate(data, schema);
    }

    // Validate User Login
    validateUserLogin(data: Login) {
        const schema = Joi.object().keys({
            email: Joi.string().required(),
            password: Joi.string().required()
        });
        return Joi.validate(data, schema);
    }

    // validate user forgot password
    validateUserForgotPasswordReset(data: PasswordForgot) {
        const schema = Joi.object().keys({
            email: Joi.string().required()
        });
        return Joi.validate(data, schema);
    }

    // validate user password reset
    validateUserPasswordReset(data: PasswordReset) {
        const schema = Joi.object().keys({
            email: Joi.string().required(),
            password: Joi.string().required(),
            otp: Joi.string().required()

        });
        return Joi.validate(data, schema);
    }


    // ************************* PROJECT ******************** //

    validateProject(data: IProject) {
        const schema = Joi.object().keys({
            name: Joi.string().required()
        });
        return Joi.validate(data, schema);
    }


    // ************************* CARD ******************** //

    validateCard(data: ICard) {
        const schema = Joi.object().keys({
            name: Joi.string().required(), 
            priority: Joi.string().required(), 
            type: Joi.string().required(), 
            assignee: Joi.array().items(Joi.string().required()).required(), 
            description: Joi.string().required(), 
            project: Joi.string().required()
        });
        return Joi.validate(data, schema);
    }




}
