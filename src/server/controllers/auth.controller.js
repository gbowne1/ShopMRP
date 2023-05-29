const config = require("../config/auth.config.js");
const db = require("../db");
const sql = require("../db/sql");
const formatSql = require("pg-format");

const jwt = require("jsonwebtoken");
const argon2 = require("argon2");

exports.signup = async (req, res) => {
  // Save User to Database
  const username = req.body.username;
  const email = req.body.email;
  const password = await argon2.hash(req.body.password);

  console.log(username, email, password);

  try {
    let result = await db.query(sql.insertUser, [username, email, password]);

    console.log("Insert user:", result);

    if (result.rows.length) {
      const recordset = result.rows;
      // create user role records
      const user_id = result.rows[0].id;
      const roles = req.body.roles;
      if (roles) {
        roles.forEach(async (role) => {
          result = await db.query(sql.insertUserRole, [user_id, role]);
        });
      } else {
        // create user role user only
        result = db.query(sql.insertUserRole, [user_id, "user"]);
      }
      res.status(201).json({
        recordset: result.rows,
        message: "User was registered successfully",
      });
    } else {
      res.status(409).send("User already exists");
    }
    // response should include a Location with url to newly created record
  } catch (err) {
    console.log(err);
    // send a 500 error to client
    res.status(500).json({ error: err });
  }
};

exports.signin = async (req, res) => {
  const username = req.body.username;
  try {
    const result = await db.query(formatSql(sql.getUserBy, "username"), [
      username,
    ]);

    const user = result.rows[0];

    console.log("User:", user);

    if (result.rows.length) {
      const passwordIsValid = await argon2.verify(
        user.password,
        req.body.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!",
        });
      }

      const token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400, // 24 hours
      });

      const result = await db.query(sql.getUserRoles, [user.id]);
      console.log(result.rows);
      const authorities = result.rows.map((role) => {
        return "ROLE_" + role.name.toUpperCase();
      });
      res.status(200).send({
        id: user.id,
        username: user.username,
        email: user.email,
        roles: authorities,
        accessToken: token,
      });
    } else {
      res.status(404).send({
        message: "User not found",
      });
    }
  } catch (err) {
    console.log(err);
    // send a 500 error to client
    res.status(500).json({ error: err });
  }
};
