import jsonwebtoken from "jsonwebtoken";

const jwt = jsonwebtoken;

export function auth (req, res, next){
    //assign a token for a request
    // const token = req.header('auth-token');      
    const authHeader = req.headers["authorization"]
    if(!authHeader) return res.status(401).json({message: 'Access Denied!'}) 

    const token = authHeader.split(" ")[1];

    try {
        //verifying a req Token above with actual Token u have in .env file
        const verified = jwt.verify(token, process.env.TOKEN_SECRET); 
        req.user = verified;

        next();
    } catch (error) {
        res.status(400).json({status: "Fail", message: 'Invalid Token'});
    }
}

export function decodeToken (token){
     try {
        //verifying a req Token above with actual Token u have in .env file
        const verified = jwt.verify(token, process.env.ADMIN_TOKEN); 
       return verified
    } catch (error) {
        return 
    }
}
export const admin = (req, res, next) => {
    const bearerToken = req.headers.authorization;
    if (bearerToken) {
        const token = bearerToken.split(" ")[1];
        const payload = decodeToken(token);
        if (payload?.role == "admin") return next();
        return res.status(401).json({ status: "fail", message: "you are not allowed to access this service" });
    }
    return res
        .status(401)
        .json({ status: "fail", message: "Not Authorized , please login" });
};