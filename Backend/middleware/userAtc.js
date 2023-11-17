const jwt = require("jsonwebtoken");
const SECRET_KEY = "THISISOURSECRETKEYWHICHISSECRET";

const userAtc = async (req, res, next) => {
  req.user = null;
  const token = req.header("auth-token");
  if (!token) {
    return res.status(401).send("no token");
  }

  try {
    const data = jwt.verify(token, SECRET_KEY);
    req.user = data.data;
  } catch (error) {
    return res.status(401).send("jwt verify error!");
  }
  next();
};

module.exports = userAtc;
