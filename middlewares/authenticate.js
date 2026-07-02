import jwt from "jsonwebtoken";

export default function authenticate(req, res, next) {

    const header = req.header("Authorization");

    if (!header) {
        return next();
    }

    const token = header.replace("Bearer ", "");

    jwt.verify(token, "secretkey99!!!!!!", (err, decoded) => {

        if (err || !decoded) {
            return res.status(401).json({
                message: "Invalid token"
            });
        }

        req.user = decoded;

        next();
    });

}