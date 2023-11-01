const fetchUser = require("../middleware/fetchUser");
const Product = require("../models/products");
const express = require("express");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const fs = require("fs");
const bodyParser = require("body-parser");
const twilio = require("twilio");
require("dotenv").config();

const app = express();
app.use(bodyParser.json());

// Route 1[get]: fetching all products...[Login required]  --/eShopping/products/fetchallproducts

router.get("/fetchallproducts", async (req, res) => {
  try {
    const products = await Product.find();
 
    res.json(products);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

// Getting single product
router.get("/a/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.json(product);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

// Route 2[post]: Adding products...[Login required]  --/eShopping/products/addproduct
router.post(
  "/addproduct",
  [body("title", "enter the name of the product...").exists()],

  async (req, res) => {
    const result = await validationResult(req);
    if (!result.isEmpty()) {
      return res.send({ errors: result.array() });
    }
    try {
      const products = await Product.find();
      const {
        id,
        title,
        images,
        price,
        description,
        rating,
        discountPercentage,
        brand,
        category,
        stock,
        tag,
      } = req.body;

      for (let i = 0; i < products.length; i++) {
        if (products[i].id === id) {
          return res.status(202).send("Product already exists!");
        }
      }

      //creation an products object
      const product = new Product({
        id,
        title,
        images,
        price,
        description,
        rating,
        discountPercentage,
        brand,
        category,
        stock,
        tag,
      });
      const saveProduct = await product.save();
      if (!saveProduct) {
        return res.status(202).send("product doesn't save");
      }
      res.send(product);
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  }
);

// Route 3[put]: Updating the existing products...[Login required]  --/eShopping/products/updateproduct/:id
router.put("/updateproduct/:id", async (req, res) => {
  try {
    let {
      id,
      title,
      images,
      price,
      description,
      rating,
      discountPercentage,
      brand,
      category,
      stock,
      tag,
    } = req.body;
    //creating a new product object
    const newProduct = {
      id,
      title,
      images,
      price,
      description,
      rating,
      discountPercentage,
      brand,
      category,
      stock,
      tag,
    };

    // Find the product to updated and update it
    let product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).send("Product is not found!");
    }

    product = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: newProduct },
      { new: true }
    );
    res.json(product);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

// Route 4[delete]: Deleting a product...[Login required]  --/eShopping/products/deleteproduct/:id
router.delete("/deleteproduct/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).send("product is not found!");
    }

    const deleteproduct = await Product.findByIdAndDelete(req.params.id);
    if (!deleteproduct) {
      return res.status(500).send("your product is not deleted.");
    }
    res.status(200).send(product);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

// Route 5: product Click
router.get("/productPage/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findById(id);
    res.send(product);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

function generateOTP() {
  return Math.floor(1000 + Math.random() * 9000).toString();
}

//opt generator
const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

const otpMap = new Map();

router.post("/send-otp", async (req, res) => {
  const { phoneNumber } = req.body;
  const otp = generateOTP();

  otpMap.set(phoneNumber, otp); // Store OTP temporarily

  await client.verify.v2.services
    .create({ friendlyName: "My Verify Service" })
    .then((service) => console.log(service.sid));

  // puts verification.sid
  client.messages
    .create({
      body: `Your OTP is: ${otp}`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phoneNumber,
    })
    .then(() => {
      res.json({ message: "OTP sent successfully" });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: "Failed to send OTP" });
    });
});

// Category wise products
router.get("/category=:cat", async (req, res) => {
  try {
    let category = req.params.cat;
    const products = await Product.find({ category: category });
    res.send(products);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/searchedProducts/:query", async (req, res) => {
  try {
    const query = req.params.query.trim();
    const products = await Product.find();
    const searchedProducts = products.filter((product) =>
      product.title.toLowerCase().includes(query.toLowerCase())
    );
    const ans = {
      search: searchedProducts,
      query: query
    }
    res.send(ans.search);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/tag/:tag", async (req, res) => {
  try {
    const pro = await Product.find();
    // for (let i = 0; i < pro.length; i++) {
    //   if (pro[i].rating > 4.5) {
    //     product = await Product.findByIdAndUpdate(
    //       pro[i]._id,
    //       { $set: { tag: "popular" } },
    //       { new: true }
    //     );
    //   }
    // }
    const tag = req.params.tag;
    const products = await Product.find({ tag: tag });
    res.send(products);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
