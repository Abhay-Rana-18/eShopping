const checkAdmin = (req, res, next) => {
  const email = req.body.email;
  if (email === "ranaabhay795@gmail.com") {
    req.admin = true;
  } else {
    req.admin = false;
  }
  next();
};

module.exports = checkAdmin;
