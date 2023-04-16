"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validator = void 0;
const Joi = __importStar(require("joi"));
class Validator {
    constructor() { }
    // ************************* USER ******************** //
    // validate user register data
    validateRegisterData(data) {
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
    validateUserLogin(data) {
        const schema = Joi.object().keys({
            email: Joi.string().required(),
            password: Joi.string().required()
        });
        return Joi.validate(data, schema);
    }
    // validate user forgot password
    validateUserForgotPasswordReset(data) {
        const schema = Joi.object().keys({
            email: Joi.string().required()
        });
        return Joi.validate(data, schema);
    }
    // validate user password reset
    validateUserPasswordReset(data) {
        const schema = Joi.object().keys({
            email: Joi.string().required(),
            password: Joi.string().required(),
            otp: Joi.string().required()
        });
        return Joi.validate(data, schema);
    }
    // ************************* PROJECT ******************** //
    validateProject(data) {
        const schema = Joi.object().keys({
            name: Joi.string().required()
        });
        return Joi.validate(data, schema);
    }
    // ************************* CARD ******************** //
    validateCard(data) {
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
exports.Validator = Validator;
//# sourceMappingURL=validate.js.map