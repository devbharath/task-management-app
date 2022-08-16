import React, { useState } from "react";
import { Navigate, Link } from "react-router-dom";
import axios from "axios";
import DashMenu from "../Dash-menu-bar/DashMenu";
import "../../Components/Global CSS/style.css";

const AddEmployee = () => {
  const [newUser, setNewUser] = useState({
    name: "",
    empid: "",
    password: "",
    againpassword: "",
    adminstatus: false,
    adminrequest:false,

  });
  const [passMisMatch, setPassMisMatch] = useState(false);
  const [badpass, setBadpass] = useState(false);
  const [empty, setEmpty] = useState(false);
  const [err, setErr] = useState([]);

  const submitData = () => {
    axios
      .post("http://localhost:6006/user-details/SignUp", newUser)
      .then((req, res) => {
        console.log("req", req);
        setNewUser({
          name: "",
          empid: "",
          password: "",
          againpassword: "",
          adminrequest: false,
          adminstatus: false,
        });
      });
  };
  const handleadmin = () => {
    setNewUser({ ...newUser, adminstatus: !newUser.adminstatus });
  };

  const validateSubmit = (e) => {
    console.log("triggered");
    if (
      newUser.name !== "" &&
      newUser.empid !== "" &&
      newUser.password !== "" &&
      newUser.againpassword !== ""
    ) {
      setEmpty(false);
      if (newUser.password.length > 7) {
        setBadpass(false);
        if (newUser.password === newUser.againpassword) {
          setPassMisMatch(false);
          submitData();
          alert("posted")
        } else {
          setPassMisMatch(true);
        }
      } else {
        setBadpass(true);
      }
    } else {
      setEmpty(true);
    }
  };

  return (
    <>
      <DashMenu />
      <div className="white-blk  addemployee">
        <h1>Create Employee</h1>
        <div className="form-flex">
          <div className="flex-input">
            <span>Enter Full Name :</span>
            <input
              className="log-sign-input"
              type="text"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            ></input>
          </div>
          <div className="flex-input">
            <span >Enter Employee ID :</span>
            <input
              value={newUser.empid}
              className="log-sign-input"
              type="text"
              onChange={(e) =>
                setNewUser({ ...newUser, empid: e.target.value })
              }
            ></input>
          </div>
          <div className="flex-input">
            <span>Enter Password :</span>
            <input
              value={newUser.password}
              className="log-sign-input"
              type="password"
              onChange={(e) =>
                setNewUser({ ...newUser, password: e.target.value })
              }
            ></input>
          </div>
          <div className="flex-input">
            <span>Enter Password Again:</span>
            <input
              value={newUser.againpassword}
              className="log-sign-input"
              type="password"
              onChange={(e) =>
                setNewUser({ ...newUser, againpassword: e.target.value })
              }
            ></input>
          </div>
          <div className='flex-input'>
            <span><input name='adminreg' type='checkbox' onChange={()=>handleadmin()} value={newUser.adminstatus}/>Make as Admin </span>  
            <div></div>

          </div>
          <button className="simple-btn" onClick={()=>validateSubmit()}>Create</button>
        </div>
       
      </div>

    </>
  );
};

export default AddEmployee;
