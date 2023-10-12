const registrationForm = require("../models/registrationForm");

const VerifyToken = async (req, res, next) => {
    try {

        const token = req.cookies.token;
        const clienttoken = req.headers.authorization;

        if (token != clienttoken) {
            res.status(401).json({ message: "Token is not correct from client side" });

        } else {
            const user = await registrationForm.findByToken(token);
            // const headerToken = req.header(tokenHeaderKey); 
            console.log(user);

            if (!user) {
                throw new Error("Unauthorized");
            }
            req.user = user;
            next();

        }
    } catch (err) {
        res.status(401).json({ message: err.message });
    }
};

module.exports = VerifyToken;