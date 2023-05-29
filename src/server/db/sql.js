const sql = {
  getAllEmployees:
    "SELECT id, contact_id, department_id, job_id, manager_id, firstname, lastname, phone, cell, email, dob, notes, department_name, title FROM employee_all_view;",
  getOneEmployee:
    "SELECT id, contact_id, department_id, job_id, manager_id, firstname, lastname, phone, cell, email, dob, notes, department_name, title FROM employee_all_view WHERE id=$1;",
  updateEmployee:
    "CALL update_employee($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13);",
  deleteContact: "DELETE FROM contact WHERE id = $1 RETURNING *;",
  insertEmployee:
    "CALL create_employee($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13);",
  insertDepartment: "INSERT INTO department (name) VALUES ($1) RETURNING id;",
  insertJob:
    "INSERT INTO job (title, job_description) VALUES ($1, $2) RETURNING id;",
  getAllUsers: "SELECT id, username, password FROM public.user;",
  getUserBy: "SELECT id, username, password FROM public.user WHERE %I=$1;",
  insertUser:
    "INSERT INTO public.user (username, email, password) VALUES ($1, $2, $3) RETURNING id;",
  insertRole: "INSERT INTO role (name) VALUES ($1) RETURNING id;",
  getRolesExist:
    "SELECT ARRAY['moderator', 'user'] <@ ARRAY(SELECT role.name::text FROM role) as exists;",
  getUserHasRole:
    "SELECT role.name FROM public.user INNER JOIN user_role ON public.user.id  = user_role.user_id INNER JOIN role ON user_role.role_id = role.id WHERE public.user.id = $1 AND role.name = $2;",
  insertUserRole:
    "INSERT INTO user_role VALUES($1, (SELECT role.id FROM public.role WHERE public.role.name = $2));",
  getUserRoles:
    "SELECT role.name FROM public.user INNER JOIN user_role ON public.user.id  = user_role.user_id INNER JOIN role ON user_role.role_id = role.id WHERE public.user.id = $1;",
};

module.exports = sql;
