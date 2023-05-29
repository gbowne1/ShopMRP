const db = require("../db/index");
const sql = require("../db/sql");
const formatSql = require("pg-format");

const checkDuplicateUsernameOrEmail = async (req, res, next) => {
  try {
    const username = req.body.username;
    let result = await db.query(formatSql(sql.getUserBy, "username"), [
      username,
    ]);
    console.log("Check username:", result);
    if (result.rows.length) {
      res.status(400).send({
        message: "Failed! Username is already in use!",
      });
      return;
    }

    const email = req.body.email;
    result = await db.query(formatSql(sql.getUserBy, "email"), [email]);
    console.log("Check email:", result);
    if (result.rows.length) {
      res.status(400).send({
        message: "Failed! Email is already in use!",
      });
      return;
    }

    next();
  } catch (err) {
    // send a 500 error to client
    console.log("Error:", err);
    res.status(500).json({ error: err });
  }
};

const checkRolesExist = async (req, res, next) => {
  try {
    let roles = req.body.roles;
    console.log("Roles:", roles);

    const result = await db.query(sql.getRolesExist);
    const exists = result.rows[0].exists;
    console.log("Roles result:", exists);
    if (!exists) {
      res.status(400).send({
        message: "Failed! Role(s) does not exist = " + result.rows.toString(),
      });
      return;
    }
    console.log("Roles OK");
    next();
  } catch (err) {
    // send a 500 error to client
    res.status(500).json({ error: err });
  }
};
