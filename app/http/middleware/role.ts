import compose from "composable-middleware";
export class RoleMiddleware {
    isAdmin() {
        return (
            compose()
                // Attach user to request
                .use((req, res, next) => {
                    if (req.user.role == 'Admin') {
                        next();
                    } else {
                        res.status(401).send({ success: false, msg: "Insufficient privileges." });
                        return
                    }
                })
        )
    }
    isUser() {
        return (
            compose()
                // Attach user to request
                .use((req, res, next) => {
                    if (req.user.role == 'User' || req.user.role == 'Admin') {
                        next();
                    } else {
                        res.status(401).send({ success: false, msg: "Insufficient privileges." });
                        return
                    }
                })
        )
    }
}