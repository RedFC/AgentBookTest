import jwt from "jsonwebtoken";
import compose from "composable-middleware"
import fs from "fs"

var publicKEY = fs.readFileSync("config/cert/accessToken.pub", "utf8");

export class AuthenticationMiddleware {
    constructor() {
    }
    isAuthenticated() {
        return (
            compose()
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
                        var decodedJWTHeader = JSON.parse(
                            Buffer.from(JWTSPLIT[0], "base64").toString()
                        );
                        if (decodedJWTHeader.alg != "RS256") {
                            res.send({
                                success: false,
                                msg: "Access Denied. Compromised Authorized Token.",
                                status: 401,
                            });
                            return;
                        }
                        var decoded = jwt.verify(token, publicKEY, verifyOptions);
                        req.user = decoded;
                        req.auth = token;
                        next();
                    } catch (ex) {
                        console.log("exception: " + ex);
                        res
                            .status(400)
                            .send({ success: false, msg: "Invalid token.", status: 400 });
                    }
                })
        );
    }
    
}