const db = require("../db");
const sql = require("../db/sql");

const sharp = require("sharp");

// retrieve all
const employeeAll = async (req, res) => {
  try {
    const result = await db.query(sql.getAllEmployees);
    console.log("Result Recordset:", result.rows);
    res.status(200).json({
      recordset: result.rows,
    });
  } catch (err) {
    // send a 500 error to client
    res.status(500).json({ error: err });
  }
};

// retrieve one
const employeeOne = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await db.query(sql.getOneEmployee, [id]);

    if (result.rows.length) {
      res.status(200).json({
        recordset: result.rows[0],
      });
    } else {
      res.status(404).send(`No employee exists with id = ${id}`);
    }
  } catch (err) {
    // send a 500 error to client
    res.status(500).json({ error: err });
  }
};

// create
const employeeCreate = async (req, res) => {
  const {
    firstname,
    lastname,
    phone,
    cell,
    email,
    dob,
    notes,
    department_id,
    job_id,
    manager_id,
    contact_id,
    employee_id,
  } = req.body;

  let photo = null;
  if (req.body.images.length) {
    photo = req.body.images[0];
    console.log("Original Size:", req.files[0].size);
    console.log("Compressed Size:", photo.length);
  }

  try {
    const result = await db.query(sql.insertEmployee, [
      firstname,
      lastname,
      phone,
      cell,
      email,
      dob,
      photo,
      notes,
      department_id,
      job_id,
      manager_id,
      contact_id,
      employee_id,
    ]);

    if (result.rows.length) {
      res.status(201).json({
        data: result.rows,
        rows: result.rows.length,
      });
    } else {
      res.status(409).send("Employee already exists");
    }
    // response should include a Location with url to newly created record
  } catch (err) {
    // send a 500 error to client
    res.status(500).json({ error: err });
  }
};

// delete
const employeeDelete = async (req, res) => {
  try {
    const id = req.params.id;
    const contact_id = req.body.contact_id;
    const result = await db.query(sql.deleteContact, [contact_id]);

    if (result.rows.length) {
      res.status(204).json({
        rows: result.rows.length,
        data: result.rows,
      });
    } else {
      res
        .status(404)
        .send(`No employee exists with contact id = ${contact_id}`);
    }
  } catch (err) {
    // send a 500 error to client
    res.status(500).json({ error: err });
  }
};

// update
const employeeUpdate = async (req, res) => {
  const employee_id = req.params.id;
  const {
    firstname,
    lastname,
    phone,
    cell,
    email,
    dob,
    notes,
    department_id,
    job_id,
    manager_id,
    contact_id,
  } = req.body;

  let photo = null;
  if (req.file !== "undefined") {
    photo = req.file.buffer;
  }

  try {
    const result = await db.query(sql.updateEmployee, [
      firstname,
      lastname,
      phone,
      cell,
      email,
      dob,
      photo,
      notes,
      department_id,
      job_id,
      manager_id,
      contact_id,
      employee_id,
    ]);

    if (result.rows.length) {
      res.status(200).json({
        rows: result.rows.length,
        data: result.rows,
      });
    } else {
      console.log("result:", result);
      res.status(404).send(`Employee with id = ${employee_id} not updated`);
    }
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

module.exports = {
  employeeAll,
  employeeOne,
  employeeCreate,
  employeeDelete,
  employeeUpdate,
};
