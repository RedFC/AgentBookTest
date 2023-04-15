"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const composable_middleware_1 = __importDefault(require("composable-middleware"));
const fs_1 = __importDefault(require("fs"));
var publicKEY = fs_1.default.readFileSync("config/cert/accessToken.pub", "utf8");
class AuthenticationMiddleware {
    constructor() {
    }
    isAuthenticated() {
        return (composable_middleware_1.default()
            // Attach user to request
            .use((req, res, next) => {
            let token = req.headers['x-access-token'] || req.headers['authorization'];
            if (!token)
                return res.status(401).send({
                    success: false,
                    msg: "Access Denied. No token provided.",
                    code: 401,
                });
            // Remove Bearer from string
            token = token.replace(/^Bearer\s+/, "");
            try {
                var verifyOptions = {
                    issuer: "admin@admin.com",
                    algorithm: ["RS256"],
                };
                let JWTSPLIT = token.split(".");
                var decodedJWTHeader = JSON.parse(Buffer.from(JWTSPLIT[0], "base64").toString());
                if (decodedJWTHeader.alg != "RS256") {
                    res.send({
                        success: false,
                        msg: "Access Denied. Compromised Authorized Token.",
                        status: 401,
                    });
                    return;
                }
                var decoded = jsonwebtoken_1.default.verify(token, publicKEY, verifyOptions);
                req.user = decoded;
                req.auth = token;
                next();
            }
            catch (ex) {
                console.log("exception: " + ex);
                res
                    .status(400)
                    .send({ success: false, msg: "Invalid token.", status: 400 });
            }
        }));
    }
}
exports.AuthenticationMiddleware = AuthenticationMiddleware;
//# sourceMappingURL=auth.js.map