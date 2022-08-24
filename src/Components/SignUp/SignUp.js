import React, { useState,useEffect } from "react";
import style from "../Global CSS/style.css";
import { Link, useNavigate } from "react-router-dom";
import TopNavBar from "../Top-NavBar/TopNavBar";
import axios from "axios";

function SignUp() {
  const navigate=useNavigate()
  const [newUser, setNewUser] = useState({
    name: "",
    empid: "",
    password: "",
    againpassword: "",
    adminrequest: false,
    adminstatus: false,
  });
  const [passMisMatch, setPassMisMatch] = useState(false);
  const [badpass, setBadpass] = useState(false);
  const [empty, setEmpty] = useState(false);
  const [alreadyExists, setAlreadyExists] = useState(false)
  const [allEmps, setAllEmps] = useState([]);

  useEffect(()=>{
    axios.get("http://localhost:6006/user-details/fetchusers")
    .then((res)=>{
      setAllEmps(res.data)
    })
  },[])

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
        navigate("/")
      });
  };
  const handleadmin = () => {
    setNewUser({ ...newUser, adminrequest: !newUser.adminrequest });
  };

  const validateSubmit = (e) => {
    console.log("triggered");
    e.preventDefault();
    if (
      newUser.name !== "" &&
      newUser.empid !== "" &&
      newUser.password !== "" &&
      newUser.againpassword !== ""
    ) {
      setEmpty(false);
      if(!allEmps.map(e=>e.empid).includes(newUser.empid )){
        setAlreadyExists(false)
      if (newUser.password.length > 7) {
        setBadpass(false);
        if (newUser.password === newUser.againpassword) {
          setPassMisMatch(false);
          submitData();
        } else {
          setPassMisMatch(true);
        }
      } else {
        setBadpass(true);
      }
    }else{
      setAlreadyExists(true)
    }
    } else {
      setEmpty(true);
    }
  };

  return (
    <>
    <div className="login-sign-cont">
      <TopNavBar />
      <div className="login-cont sign-cont">
        <form onSubmit={(e) => validateSubmit(e)}>
          <div className="login-sign-title">Sign Up</div>
          <div className="input-cont">
            <input
              className="log-sign-input"
              type="text"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              placeholder="Full Name"
            ></input>
          </div>
          <div className="input-cont">
            <input
              value={newUser.empid}
              className="log-sign-input"
              type="text"
              onChange={(e) =>
                setNewUser({ ...newUser, empid: e.target.value })
              }
              placeholder="Employee ID"
            ></input>
          </div>
          <div>
            <input
              value={newUser.password}
              className="log-sign-input"
              type="password"
              onChange={(e) =>
                setNewUser({ ...newUser, password: e.target.value })
              }
              placeholder="Password"
            ></input>
          </div>
          <div>
            <input
              value={newUser.againpassword}
              className="log-sign-input"
              type="password"
              onChange={(e) =>
                setNewUser({ ...newUser, againpassword: e.target.value })
              }
              placeholder="Password"
            ></input>
          </div>
          <div>
            <span>
              <input
                name="adminreg"
                type="checkbox"
                onChange={() => handleadmin()}
                value={newUser.adminrequest}
              />
              <label for="adminreq">Create as Admin</label>
            </span>
          </div >

          <div>
            <button type="submit">Signup</button>
          </div>
          <div className="sm-white">
            Already have an account? <Link to="/">Log-in</Link>
          </div>
        </form>
        <span className="err-alert-white">
          {empty ? <div>⚠️ Dont leave any fields empty.</div> : null}
          {badpass ? <div>⚠️ Password must be minimum 8 characters.</div> : null}
          {passMisMatch ? <div>⚠️ Password Does'nt match.</div> : null}
          {alreadyExists ? <div>⚠️ Entered Employee ID already exists.</div> : null}

          </span>
      </div>
    </div>
    </>
  );
}

export default SignUp;
