"use strict";
import jwt from 'jsonwebtoken';
import fs from 'fs';
var privateKey = fs.readFileSync("config/cert/accessToken.pem", "utf8");

export class AuthService {
    constructor() { }

    auth(payload: { id: string, username: string, email: string, role: string }): Promise<String> {
        return new Promise(async (resolve, reject) => {
            try {
                const token = jwt.sign(payload, privateKey, { algorithm: "RS256", expiresIn: "1d", issuer: "admin@admin.com" })
                resolve(token)
            } catch (error) {
                reject(error)
            }
        })
    }

}
