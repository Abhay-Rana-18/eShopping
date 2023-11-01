const express = require("express");
// const env = require("dotenv").config();
const User = require("../models/user");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchUser = require("../middleware/fetchUser");
const checkAdmin = require("../middleware/checkAdmin");
const router = express.Router();
const app = express();
const cookieParser = require("cookie-parser");

const SECRET_KEY = "THISISOURSECRETKEYWHICHISSECRET";

app.use(cookieParser());

// Router 1: Registration-authentication   --/eShopping/auth/
router.post(
  "/",
  [
    body("name", "Name must be at least of 3 characters...").isLength({
      min: 3,
    }),
    body("email", "Enter a valid email...").isEmail(),
    body("password", "Password must be at least of 3 characters...").isLength({
      min: 3,
    }),
  ],
  checkAdmin,
  async (req, res) => {
    const result = await validationResult(req);
    if (!result.isEmpty()) {
      return res.send({ errors: result.array() });
    }
    try {
      let success = false;
      const salt = await bcrypt.genSalt(10);
      let securePass = await bcrypt.hash(req.body.password, salt);

      let user = await User.findOne({ email: req.body.email });
      if (user) {
        const data = {
          id: user.id,
        };
        const token = await jwt.sign({ data }, SECRET_KEY, {
          expiresIn: "10d",
        });

        return res.status(202).json({
          success: success,
          msg: `This user is already exists. with token of ${token}`,
        });
      }

      user = new User({
        name: req.body.name,
        email: req.body.email,
        password: securePass,
      });

      await user.save();
      const data = {
        id: user.id,
      };

      const token = jwt.sign({ data }, SECRET_KEY, {
        expiresIn: "10d",
      });

      success = true;

      return res.status(200).json({
        admin: req.admin,
        success: success,
        authtoken: token,
      });
    } catch (error) {
      return res.status(402).json({ error: error.message });
    }
  }
);

// Router 2: Login-authenticaion   --/api/auth/login
router.post(
  "/login",
  [
    body("email", "Enter a valid email...").isEmail(),
    body("password", "Enter pasword").exists(),
  ],
  checkAdmin,
  async (req, res) => {
    const result = await validationResult(req);
    if (!result.isEmpty()) {
      return res.send({ errors: result.array() });
    }
    try {
      
      let success = false;
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        res
          .status(404)
          .json({ err: "user not found! First register yourself" });
      } else {
        const compPass = await bcrypt.compare(req.body.password, user.password);
        if (!compPass) {
          return res
            .status(202)
            .json({ err: "Incorrect password! try again." });
        } else {
          success = true;
          const data = {
            id: user.id,
          };
          const token = await jwt.sign({ data }, SECRET_KEY, {
            expiresIn: "10d",
          });

          // await res.cookie("authtoken", token, {
          //   sameSite: "strict",
          //   expires: new Date(Date.now() + 30000000000),
          //   httpOnly: true,
          // });

          return res.status(200).json({
            admin: req.admin,
            success: success,
            authtoken: token,
          });
        }
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);


// Route 3: Get the deatils of user from jwt token [login Required] --/api/auth/getuser
router.get("/getuser", fetchUser, async (req, res) => {
  try {
    
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).send("no user was founded by this auth-token.");
    }
    // console.log(req.cookies.authtoken);
    res.send("token");
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
