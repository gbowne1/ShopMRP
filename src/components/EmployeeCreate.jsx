  import React, { Component } from "react";
  import { useNavigate } from "react-router-dom";
  import Logo from "./logo.svg";
  import "./App.css";
  import  PropTypes  from "prop-types";

  import { makeStyles } from "@mui/material/styles";

  import Button from "@mui/material/Button";
  import AddIcon from "@mui/icons-material/Add";
  import { Icon } from "@mui/material";
  import DeleteIcon from "@mui/icons-material/Delete";
  import NavigationIcon from "@mui/icons-material/Navigation";

  import swal from "sweetalert";

  export const useStyles = makeStyles(() => ({
    appBar: {
      borderRadius: 15,
      margin: "30px 0",
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
    heading: {
      color: "rgba(0,183,255, 1)",
    },
    image: {
      marginLeft: "15px",
    },
  }));

  class EmployeeCreate extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        attributeValue: "id",
        user: false,
        id: true,
        addForm: false,
        employee: ["id", "name", "location", "salary"],
      };
    }

    email(str) {
      const email = str.target.value;
      this.setState({
        email: email,
      });
    }

    password(str) {
      const password = str.target.value;
      this.setState({
        password: password,
      });
    }

    formName(a) {
      this.setState({
        employeeName: a.target.value,
      });
    }
    formEmail(a) {
      this.setState({
        employeeEmail: a.target.value,
      });
    }
    formAddress(a) {
      this.setState({
        employeeAddress: a.target.value,
      });
    }

    formPosition(a) {
      this.setState({
        employeePosition: a.target.value,
      });
    }

    addEmployees() {
      const { employeeName, employeeAddress, employeeEmail, employeePosition, employee } = this.state;

      employee.push({
        employeeName: employeeName,
        employeeAddress: employeeAddress,
        employeeEmail: employeeEmail,
        employeePosition: employeePosition,
      });

      this.setState({
        employee,
        employeeName: "",
        employeeAddress: "",
        employeeEmail: "",
        employeePosition: "",
        addForm: false,
      });
    }

    logout = () => {
      sessionStorage.setItem("userToken", "");
      sessionStorage.clear();
      localStorage.clear();
      this.setState({
        user: false,
        employee: [],
        redirect: true,
      });
      window.location.href = "http://localhost:3000";
    };

    renderLogin = () => {
      return (
        <div className='login'>
          <div className='loginHeader'>
            <h1>LOGIN</h1>
          </div>
          <hr></hr>

          <div className='loginMain'>
          <input type="email" placeholder="Enter Your Email" onChange={this.email.bind(this)} />
			<input type="password" placeholder="Enter Your Password" onChange={this.password.bind(this)} />
			<button onClick={this.handleLogin}>LOGIN</button>
          </div>
        </div>
      );
    };

    showTable = () => {
      const { employee } = this.state;

      return (
        <div className='employee'>
          <div className='employeeHeader'>
            <h1>Employee Details</h1>
            <button onClick={() => this.setState({ addForm: true })}> Add Employee</button>
            <button onClick={this.logout.bind(this)}> logout</button>
          </div>

          <table className='table' border='1px'>
            <thead>
              <tr>
                <th>Email</th>
                <th>Name</th>
                <th>Address</th>
                <th>Position</th>
              </tr>
            </thead>
            <tbody>
              {employee.map((user, index) => {
                return (
                  <tr>
                    <td>{user.employeeEmail}</td>
                    <td>{user.employeeName}</td>
                    <td>{user.employeeAddress}</td>
                    <td>{user.employeePosition}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      );
    };

addEmployeeForm = () => {
  return (
    <div className='employee form'>
      <h1>Add Employee Form</h1>

      <input type='email' placeholder=' Email' onChange={this.formEmail.bind(this)}></input>
      <br></br>
      <input type='text' placeholder='Name' onChange={this.formName.bind(this)}></input>
      <br></br>
      <input type='text' placeholder='Address' onChange={this.formAddress.bind(this)}></input>
      <br></br>
      <input type='text' placeholder='Position' onChange={this.formPosition.bind(this)}></input>
      <button onClick={this.addEmployees.bind(this)}>Add Employee</button>
    </div>
  );
};

addtext = () => {
  var text = this.state.text;
  const obj = { text, date: new Date() };
  console.log(obj);
};

render = () => {
  const { user, addForm } = this.state;

  return (
    <div className='App'>
      {!user && this.renderLogin()}
      {user && !addForm && this.showTable()}
      {user && addForm && this.addEmployeeForm()}
    </div>
  );
};

onCreateEmployee = () => {
  console.log(this.state.Id);
};

function Redirect() {
  let navigate = useNavigate();
  function handleClick() {
    navigate(-1);
  }
  return (
    <div>
      <button onClick={handleClick}>go home</button>
    </div>
  );
}

function EmployeeCreate() {
  return (
    <div>
      <h1>Create a new employee</h1>
    </div>
  );
}

EmployeeCreate.propTypes = {
  name: PropTypes.string,
  id: PropTypes.number,
  age: PropTypes.number,
  address: PropTypes.object,
};

export { Redirect, EmployeeCreate };
