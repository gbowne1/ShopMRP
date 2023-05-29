const express = require("express");
const router = express.Router();

const employeeController = require("../controllers/employeeController");

// authenticator
const authJwt = require("../middleware/authJWT");

// validators
const validate = require("../validators/validator");
const employeeValidator = require("../validators/employeeValidator");

// multi-part form processing
const uploadPhoto = require("../middleware/formDataProcessing");

const compressImages = require("../middleware/imageCompression");

// routes

router.get("/", [authJwt.verifyToken], employeeController.employeeAll);

router.get("/:id", [authJwt.verifyToken], employeeController.employeeOne);

router.post(
  "/",
  [authJwt.verifyToken],
  uploadPhoto,
  validate(employeeValidator),
  compressImages,
  employeeController.employeeCreate
);

router.delete("/:id", [authJwt.verifyToken], employeeController.employeeDelete);

router.put(
  "/:id",
  [authJwt.verifyToken],
  uploadPhoto,
  validate(employeeValidator),
  compressImages,
  employeeController.employeeUpdate
);

module.exports = router;
