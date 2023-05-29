const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../db");
const sql = require("../db/sql");

const verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "No token provided!",
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!",
      });
    }
    req.userId = decoded.id;
    next();
  });
};

const isAdmin = async (req, res, next) => {
  try {
    const result = await db.query(sql.getUserHasRole, [req.userId, "admin"]);

    if (result.rows.length) {
      next();
    } else {
      res.status(403).send({
        message: "Admin role required to access requested resource",
      });
    }
  } catch (err) {
    // send a 500 error to client
    res.status(500).json({ error: err });
  }
};

const isModerator = async (req, res, next) => {
  try {
    const result = await db.query(sql.getUserHasRole, [
      req.userId,
      "moderator",
    ]);

    if (result.rows.length) {
      next();
    } else {
      res.status(403).send({
        message: "Moderator role required to access requested resource",
      });
    }
  } catch (err) {
    // send a 500 error to client
    res.status(500).json({ error: err });
  }
};

const authJwt = {
  verifyToken,
  isAdmin,
  isModerator,
};

module.exports = authJwt;
