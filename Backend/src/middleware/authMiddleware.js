import jwt from "jsonwebtoken";


export const authMiddleware = (req, res, next) =>{

    try{

        const token = req.headers.authorization?.split(" ")[1];

        if(!token){
            return res.status(401).json({
                message: "authrization is missing"
            });
        }

        const decode = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.user = decode;

        next();

    }
    catch(error){
        console.error("JWT verification error:", error.message);

        return res.status(401).json({
            message: "Invalid or expired token"
        });
    }
};

