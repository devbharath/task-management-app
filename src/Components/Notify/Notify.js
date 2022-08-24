import React, { useEffect, useState } from "react";
import DashMenu from "../Dash-menu-bar/DashMenu";
import axios from "axios";
import "../Global CSS/style.css";

const Notify = () => {
  const [reqs, setReqs] = useState([]);
  const [toggle, setToggle] = useState(true);


  useEffect(() => {
    axios.get("http://localhost:6006/user-details/fetchusers").then((emps) => {
      let adminregs = emps.data.filter((emp) => {
        return emp.adminrequest === true && emp.adminstatus === false;
      });
      setReqs(adminregs);
    });
  }, [toggle]);

  const accept=(emp)=>{
    
    axios.post("http://localhost:6006/user-details/acceptrequest",{_id:emp._id})
    .then((res)=>{
        let temp=reqs.filter(e=>!e.empid===emp.empid)
        setReqs(temp)
        

    })
    setToggle(!toggle)
  }
  return (
    <div className="white-blk">
      <DashMenu />
      <div>
        <h1>Admin Requests</h1>
        <div className="reqs-list">
          {reqs.map((emp) => {
            return (
              <div key={emp.mepid}>
                <div>{emp.name} has requested for admin status</div>
                <button onClick={()=>accept(emp)}>Accept?</button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Notify;
