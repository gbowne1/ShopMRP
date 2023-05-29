import { useState } from 'react';
import useFetch from './useFetch';

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const { loading, error } = useFetch('/api/employees');

  if (loading) {
    return <p>Loading employees...</p>;
  }

  if (error) {
    return <p>Error loading employees: {error}</p>;
  }

  return (
    <div>
      <h2>Employee List</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.firstName}</td>
              <td>{employee.lastName}</td>
              <td>{employee.email}</td>
              <td>{employee.phone}</td>
              <td>{employee.address}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}