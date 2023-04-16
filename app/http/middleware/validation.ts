import compose from "composable-middleware"
import { Validator } from "../controller/validate";
import { ResponseService } from "../services/response.service";
import { CardService } from "../services/card.service";
import { ProjectService } from "../services/project.service";

let responseService = new ResponseService();
let cardService = new CardService();
let projectService = new ProjectService();
export class ValidationMiddleware extends Validator {

    constructor() {
        super();
    }

    // USER
    validateRegisterData() {
        return (
            compose()
                .use((req, res, next) => {
                    super.validateRegisterData(req.body)
                        .then(data => {
                            next();
                        }).catch(error => {
                            return responseService.reject({
                                code: 400,
                                status: false,
                                message: error.details[0].message
                            }, res)
                        });
                })
        )
    }

    validateUserLogin() {
        return (
            compose()
                .use((req, res, next) => {
                    super.validateUserLogin(req.body)
                        .then(data => {
                            next();
                        }).catch(error => {
                            return responseService.reject({
                                code: 400,
                                status: false,
                                message: error.details[0].message
                            }, res)
                        });
                })
        )
    }

    validateUserForgotPasswordReset() {
        return (
            compose()
                .use((req, res, next) => {
                    super.validateUserForgotPasswordReset(req.body)
                        .then(data => {
                            next();
                        }).catch(error => {
                            return responseService.reject({
                                code: 400,
                                status: false,
                                message: error.details[0].message
                            }, res)
                        });
                })
        )
    }

    validateUserPasswordReset() {
        return (
            compose()
                .use((req, res, next) => {
                    super.validateUserPasswordReset(req.body)
                        .then(data => {
                            next();
                        }).catch(error => {
                            return responseService.reject({
                                code: 400,
                                status: false,
                                message: error.details[0].message
                            }, res)
                        });
                })
        )
    }

    // PROJECT
    validateProjectExist() {
        return (
            compose()
                .use((req, res, next) => {
                    projectService.readOne(req.params.id)
                        .then(data => {
                            if (!data) {
                                return responseService.reject({
                                    code: 404,
                                    status: false,
                                    message: "Project Not Found"
                                }, res)
                            }
                            next()
                        }).catch(err => {
                            return responseService.reject({
                                code: 400,
                                status: false,
                                message: err.message
                            }, res)
                        })
                })
        )
    }

    validateProject() {
        return (
            compose()
                .use((req, res, next) => {
                    super.validateProject(req.body)
                        .then(data => {
                            next();
                        }).catch(error => {
                            return responseService.reject({
                                code: 400,
                                status: false,
                                message: error.details[0].message
                            }, res)
                        });
                })
        )
    }


    // CARD

    validateCardExist() {
        return (
            compose()
                .use((req, res, next) => {
                    cardService.findOne(req.params.id)
                        .then(data => {
                            if (!data) {
                                return responseService.reject({
                                    code: 404,
                                    status: false,
                                    message: "Card Not Found"
                                }, res)
                            }
                            next()
                        }).catch(err => {
                            return responseService.reject({
                                code: 400,
                                status: false,
                                message: err.message
                            }, res)
                        })
                })
        )
    }

    validateCard() {
        return (
            compose()
                .use((req, res, next) => {
                    super.validateCard(req.body)
                        .then(data => {
                            next();
                        }).catch(error => {
                            return responseService.reject({
                                code: 400,
                                status: false,
                                message: error.details[0].message
                            }, res)
                        });
                })
        )
    }

}
