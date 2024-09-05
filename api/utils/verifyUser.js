import jwt from "jsonwebtoken"

const JWT_SECRET = 'abc123'

export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token
    console.log(token);
    if(!token) return res.status(401).send("unauthorised");

    jwt.verify(token,JWT_SECRET, (err,user) => {
        if(err) return res.status(403).send("forbidden")
        req.user = user;
        next();
    })
}