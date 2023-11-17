const express = require("express");
const router = express.Router();
const AddToCart = require("../models/addToCart");
const Product = require("../models/products");
const userAtc = require("../middleware/userAtc");

// Route 5: Add to cart --> /eShopping/atc/:id
router.post("/:id", userAtc, async (req, res) => {
  try {
    // Getting atc data from db.
    let Atc = await AddToCart.find({ user: req.user.id });

    const product = await Product.findById(req.params.id);
    product.atc = 1;

    let add = true;

    for (let i = 0; i < Atc.length; i++) {
      if (Atc[i].product_id.toString() === product._id.toString()) {
        add = false;
        break;
      }
    }
    if (add) {
      let {
        _id,
        title,
        images,
        price,
        stock,
        rating,
        brand,
        discountPercentage,
      } = product;
      const result = await new AddToCart({
        user: req.user.id,
        product_id: _id,
        title: title,
        imgUrl: images[0],
        price: price,
        stock: stock,
        rating: rating,
        brand: brand,
        discountPercentage: discountPercentage,
      });
      await result.save();
    }

    Atc = await AddToCart.find({ user: req.user.id });
    res.status(200).json(product);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

// Route to fetch cart contents --> /eShopping/atc/
router.get("/", userAtc, async (req, res) => {
  try {
    Atc = await AddToCart.find({ user: req.user.id });

    res.status(200).json(Atc);
  } catch (error) {
    return res.status(500).send(error);
  }
});

// Route to delete all cart contents --> /eShopping/atc/orderPlaced
router.delete("/orderPlaced", userAtc, async (req, res) => {
  try {
    const atc = await AddToCart.deleteMany({ user: req.user.id });
    res.status(200).send({ message: "Cart contents deleted successfully" });
  } catch (error) {
    res.status(500).send({ error: "Internal server error" });
  }
});

// Route 3: Deleting items from cart.
router.delete("/deleteItem/:id", async (req, res) => {
  try {
    const item = await AddToCart.findById(req.params.id);
    if (!item) {
      return res.status(404).send("Item not found.");
    }
    const itemDel = await AddToCart.findByIdAndDelete(req.params.id);
    if (!itemDel) {
      return res.status(204).send("item not delteted");
    }
    res.status(200).send(item);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.put("/minus/:id", async (req, res) => {
  try {
    const item = await AddToCart.findById(req.params.id);
    if (!item) {
      return res.status(404).send("Item not found.");
    }

    // Increment the 'amount' field
    item.amount -= 1;

    // Save the updated item
    const updatedItem = await item.save();

    if (!updatedItem) {
      return res.status(202).send("Atc Not updated!");
    }

    return res.send(updatedItem);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.put("/plus/:id", async (req, res) => {
  try {
    const item = await AddToCart.findById(req.params.id);
    if (!item) {
      return res.status(404).send("Item not found.");
    }

    // Increment the 'amount' field
    item.amount += 1;

    // Save the updated item
    const updatedItem = await item.save();

    if (!updatedItem) {
      return res.status(202).send("Atc Not updated!");
    }

    return res.send(updatedItem);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
