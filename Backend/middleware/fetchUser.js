const jwt = require('jsonwebtoken');
const SECRET_KEY = "THISISOURSECRETKEYWHICHISSECRET";

const fetchUser = (req, res, next) => {
    const token = req.header('auth-token');
    if (!token){
        res.status(401).send("no token");
    }
    try {
        const data = jwt.verify(token, SECRET_KEY);
        req.user = data.data;
        
    } catch (error) {
        res.status(401).send("jwt verify error!");
    }
    next();
}

module.exports = fetchUser;