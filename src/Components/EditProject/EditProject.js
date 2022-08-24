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


const EditProject = () => {
  const [allEmployee, setAllEmployee] = useState([]);
  const [allEmployeeDuplicate, setAllEmployeeDuplicate] = useState([]);
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
    createdby: "",
  });

  const roles = [
    { value: "Developer", label: "Developer" },
    { value: "Manager", label: "Manager" },
    { value: "DevOps", label: "DevOps" },
  ];

  useEffect(() => {
    let url_str = window.location.href;
    let url = url_str.split("/");
    let url_id = url.pop();
    console.log("id", url_id);
    axios
      .get("http://localhost:6006/user-details/fetchthisproject/" + url_id)
      .then((proj) => {
        console.log("proj,", proj.data);
        setDataToSend(proj.data);
        let startdate = proj.data.projectstart.split("T")[0];
        let enddate = proj.data.projectend.split("T")[0];
        setDataToSend({
          ...proj.data,
          projectstart: startdate,
          projectend: enddate,
        });
      });
    axios.get("http://localhost:6006/user-details/fetchusers").then((emps) => {
      setAllEmployee(emps.data);
      setAllEmployeeDuplicate(emps.data);
    });

    axios.get("http://localhost:6006/user-details/fetchRoles").then((allroles) => {
      setAllRoles(allroles.data)
    });

  }, []);

  useEffect(() => {
    console.log("allEmployee", allEmployee);

    seperateArr();
  }, [allEmployee, allEmployeeDuplicate]);

  const seperateArr = () => {
    let allEmpArrDuplicate = allEmployeeDuplicate;
    let splicedArray = allEmpArrDuplicate.filter(
      (x) => !DataToSend.team.map((i) => i.empid).includes(x.empid)
    );

    setAvailable(splicedArray);
  };

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
    setDataToSend({ ...DataToSend, team: newArr });
  };

  const removeFromList = (empid) => {
    let tempteamstate = DataToSend.team.filter((ele) => {
      if (ele.empid == empid) {
        let tempavailable = available;
        tempavailable?.push(ele);
        setAvailable(tempavailable);
      }
      return ele.empid !== empid;
    });
    setDataToSend({ ...DataToSend, team: tempteamstate });
  };

  const sendData = () => {
    axios
      .post("http://localhost:6006/user-details/EditProjects", DataToSend)
      .then((req, res) => {
        toast.success("Project Updated !!", {
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
  console.log(DataToSend);

  return (
    <>
      <DashMenu />

      <div className="EditProject">
        <div className="white-blk project-display ">
          <h1>Edit Project Details</h1>
          <DisplayProject
            DataToSend={DataToSend}
            setDataToSend={setDataToSend}
          />
        </div>
        <div className="white-blk project-display">
          <h1>Edit Team</h1>
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
              options={available?.map((data, index) => ({
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
          {/* <div>{JSON.stringify(available)}</div> */}
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
                <div style={{ backgroundColor: "#fef4ff" }} key={ele.empid}>
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
              Update Project
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default EditProject;
