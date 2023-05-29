const db = require("../db");
const sql = require("../db/sql");

// delete
const contactDelete = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await db.query(sql.deleteContact, [id]);

    if (result.rows.length) {
      res.status(204).json({
        rows: result.rows.length,
        data: result.rows,
      });
    } else {
      res.status(404).send(`No contact exists with id = ${id}`);
    }
  } catch (err) {
    // send a 500 error to client
    res.status(500).json({ error: err });
  }
};

module.exports = { contactDelete };
