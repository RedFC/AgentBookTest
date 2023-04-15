import { IRejected, ISuccess, ISuccessLogin } from "../interface/response.interface";
export class ResponseService {
    success(data: ISuccess,response) {
        response.status(data.code).send(data)
    }

    successLogin(data: ISuccessLogin,response) {
        response.status(data.code).send(data)
    }

    reject(data: IRejected,response) {
        response.status(data.code).send(data)
    }
}