import compose from "composable-middleware"
import { Validator } from "../controller/validate";

export class ValidationMiddleware extends Validator {
    constructor() {
        super();
    }

}
