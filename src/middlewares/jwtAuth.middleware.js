import  jwt  from "jsonwebtoken";

export const jwtAuth = (req, res, next) =>{
    //1.Read the token
    const token = req.headers['authorization'];
    //2.if no token return error
    if(!token)
    {
        return res.status(401).send('Unauthorized');
    }
    //3.check if token is valid
    try {
        const payload = jwt.verify(token,'HZmAKOhp52WitfLhLBlQcDPv2hRnxwJd');
        console.log(payload);
        req.userId = payload.userId;
    }
    catch(err){
        //4.return error
        return res.status(401).send('Unauthorized');
    }
    //5. call next middleware
    next();
}

export default jwtAuth;
