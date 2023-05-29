const { body } = require("express-validator");

const employeeValidation = [
  body("firstname").trim().isAlpha().withMessage("First name is required"),
  body("lastname").trim().isAlpha().withMessage("Last name is required"),
  body("phone")
    .optional()
    .trim()
    .matches(
      /^(?:(?:\(?(?:00|\+)([1-4]\d\d|[1-9]\d?)\)?)?[\-\.\ \\\/]?)?((?:\(?\d{1,}\)?[\-\.\ \\\/]?){0,})(?:[\-\.\ \\\/]?(?:#|ext\.?|extension|x)[\-\.\ \\\/]?(\d+))?$/i
    )
    .withMessage("Invalid phone number"),
  body("cell")
    .optional()
    .trim()
    .isMobilePhone()
    .withMessage("Invalid cell number"),
  body("email")
    .optional()
    .trim()
    .isEmail()
    .withMessage("Invalid email address"),
  body("dob").optional().isDate().withMessage("Not a valid birth date"),
  body("notes")
    .optional()
    .trim()
    .isAscii()
    .withMessage("Invalid characters in notes"),
  body("department_id")
    .optional()
    .isInt({ gt: 0 })
    .withMessage("Department id is not an integer"),
  body("role_id")
    .optional()
    .isInt({ gt: 0 })
    .withMessage("Role id is not an integer"),
];

module.exports = employeeValidation;
