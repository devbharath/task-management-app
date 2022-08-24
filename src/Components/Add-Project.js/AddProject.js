import React, { useState, useEffect } from "react";
import DashMenu from "../Dash-menu-bar/DashMenu";
import "../Global CSS/style.css";
import DisplayProject from "../DisplayProject/DisplayProject";
import DisplayTeam from "../DisplayTeam/DisplayTeam";
import Select from "react-select";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {AiOutlineCloseCircle} from "react-icons/ai"

const AddProject = () => {
  const [currUser, setCurrUser] = useState({});
  const [allEmployee, setAllEmployee] = useState();
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [role, setRole] = useState(null);
  const [available, setAvailable] = useState([]);
  const [allRoles, setAllRoles] = useState([]);
  const [DataToSend, setDataToSend] = useState({
    projectname: "",
    projectstart: "",
    projectend: "",
    description: "",
    team: [],
    projectstatus: "",
    createdby: currUser?.name,
  });

  let roles = [];

  let team = [];

  const seperateArr = () => {
    let temparr = available;
    let availableVar = allEmployee;
    availableVar?.map((all, i) => {
      team?.map((t) => {
        if (all.empid === t.empid) {
          availableVar.splice(i, 1);
        }
      });
    });
    setAvailable(availableVar);
  };

  useEffect(() => {
    axios.get("http://localhost:6006/user-details/fetchusers").then((emps) => {
      setAllEmployee(emps.data);
    });
    axios.get("http://localhost:6006/user-details/fetchRoles").then((allroles) => {
      setAllRoles(allroles.data)
    });

    let user = localStorage.getItem("currUser");
    let a = JSON.parse(user);
    setCurrUser(a);
  }, []);
  console.log("curr", currUser);

  useEffect(() => {
    seperateArr();
  }, [allEmployee]);

  const addToTeam = () => {
    let tempavailable = available;
    let tempSel = selectedEmployees;
    let tempTeam = DataToSend.team;
    let concatArr = [];

    for (let i = tempavailable.length - 1; i >= 0; i--) {
      tempSel.map((selele, ind) => {
        if (tempavailable[i].empid === selele.value.empid)
          tempavailable.splice(i, 1);
      });
    }
    tempSel.map((selele, ind) => {
      selele.value.role = role.value;
      concatArr.push(selele.value);
    });
    let newArr = tempTeam.concat(concatArr);
    setAvailable(tempavailable);
    setSelectedEmployees("");
    setDataToSend({ ...DataToSend, team: newArr, createdby: currUser.name });
  };

  const removeFromList = (empid) => {
    let tempteamstate = DataToSend.team.filter((ele) => {
      if (ele.empid == empid) {
        let tempavailable = available;
        tempavailable.push(ele);
        setAvailable(tempavailable);
      }
      return ele.empid !== empid;
    });
    setDataToSend({ ...DataToSend, team: tempteamstate });
  };

  const sendData = () => {
    axios
      .post("http://localhost:6006/user-details/AddProjects", DataToSend)
      .then((req, res) => {
        toast.success("Project Created !!", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };

  const testfn = () => {
    setDataToSend({
      projectname: "",
      projectstart: "",
      projectend: "",
      description: "",
      team: [],
      projectstatus: "",
      createdby: "",
    });
  };

  return (
    <>
      <DashMenu user={currUser} />

      <div className="addproject">
        <div className="white-blk project-display ">
          <h1>Create a new project</h1>
          <DisplayProject
            DataToSend={DataToSend}
            setDataToSend={setDataToSend}
          />
        </div>
        <div className="white-blk project-display">
          <h1>Create a Team</h1>
          <div>
            <Select
              defaultValue={role}
              onChange={setRole}
              options={allRoles}
              placeholder="Select Role"
            />

            <Select
              className="react-select-container"
              isMulti
              onChange={setSelectedEmployees}
              options={allEmployee?.map((data, index) => ({
                value: data,
                label: data.name,
              }))}
              placeholder="Select Employee"
              value={selectedEmployees}
              isDisabled={role !== null ? false : true}
            />

            <button className="simple-btn" onClick={() => addToTeam()}>
              ADD
            </button>
          </div>
          <div className="displayteam">
            <div className="list-head" style={{ border: "none" }}>
              <div >
                <div>
                  <span className="teamlabel">Emp ID: </span>
                </div>
                <div>
                  <span className="teamlabel">Name: </span>
                </div>
                <div>
                  <span className="teamlabel">Role: </span>
                </div>
              </div>
              <button style={{ display: "none" }}>Remove</button>
            </div>

            {DataToSend.team?.map((ele) => {
              return (
                <div style={{ backgroundColor: "#fef4ff",fontSize:"15px"}} key={ele.empid}>
                  <div>
                    <div>{ele.empid}</div>
                    <div>{ele.name}</div>
                    <div>{ele.role}</div>
                  </div>
                  <span onClick={() => removeFromList(ele.empid)}>
                    <AiOutlineCloseCircle/>
                  </span>
                </div>
              );
            })}
          </div>
        </div>
        <div className="white-blk create-edit-proj">
          <div>
            <button
              onClick={() => {
                testfn();
              }}
              className="simple-btn reset-btn"
            >
              Clear All
            </button>
            <button onClick={() => sendData()} className="simple-btn">
              Create Project
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default AddProject;
