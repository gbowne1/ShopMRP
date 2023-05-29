const express = require("express");
const router = express.Router();

const authJwt = require("../middleware/authJWT");
const verifySignUp = require("../middleware/verifySignUp");
const controller = require("../controllers/auth.controller");

// routes
router.post('/signup', (req, res) => {
  verifySignUp.checkDuplicateUsernameOrEmail(req, res, (err) => {
    if (err) {
      return res.status(400).send({ message: err });
    }

    verifySignUp.checkRolesExist(req, res, (err) => {
      if (err) {
        return res.status(400).send({ message: err });
      }

      controller.signup(req, res);
    });
  });
});

router.post("/signin", controller.signin);

module.exports = router;
