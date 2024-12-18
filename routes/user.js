const { Router } = require("express");
const User = require("../models/user");
const crypto = require("node:crypto");

const router = Router();

router.get("/signin", (req, res) => {
  return res.render("signin");
});

router.get("/signup", (req, res) => {
  return res.render("signup");
});

router.post("/signup", async (req, res) => {
  //console.log(req.body);
  const { fullName, email, password } = req.body;
  await User.create({
    fullName,
    email,
    password,
  });
  return res.redirect("/");
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.matchPassword(email, password);

  return res.redirect("/");
  //   const user = await User.findOne({ email: Email });
  //   if (!user) return false;
  //   const HashedPassword = crypto
  //     .createHmac("sha-256", user.salt)
  //     .update(Password)
  //     .digest("hex");

  //   return HashedPassword === user.password;
});

module.exports = router;
