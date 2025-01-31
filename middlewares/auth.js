import authService from "../service/auth.js";

function checkForAuthentication(req, res, next) {
    try {
        req.user = null;
        // const authHeader = req.headers["authorization"];
        // if (!authHeader || !authHeader.startsWith("Bearer")) {
        //     return next();
        // }

        // // "Bearer e242rf3rf" => ['','e242rf3rf'] => e242rf3rf
        // const token = authHeader.split("Bearer ")[1];

        const token = req.cookies?.jwtToken;
        if (!token) {
            return next();
        }
        const user = authService.verifyJwtToken(token);
        req.user = user;
        next();
    } catch (error) {
        console.log(`Error: ${error}`);
        return res.status(500).json({ msg: String(error) });
    }
    req.user = null;
}

function restrictTo(roles = []) {
    return function (req, res, next) {
        if (!req.user) return res.redirect("/login");
        if (!roles.includes(req.user.role)) return res.status(403).end("Unauthorized");

        return next();
    };
}

export default { checkForAuthentication, restrictTo };
