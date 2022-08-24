import React, { useState, useEffect,useContext } from "react";
import DashMenu from "../Dash-menu-bar/DashMenu";
import axios from "axios";
import "../Global CSS/style.css";
import { GrFormView } from "react-icons/gr";
import { FiEdit2 } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import Modal from "react-modal";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "100%",
    maxWidth: "600px",
    // border:"3px solid purple",
    borderRadius: "8px",
  },
  overlay: {
    backgroundColor: "#282828b5",
  },
};

const Dashboard = () => {
  let navigate = useNavigate();


  const [currUser, setCurrUser] = useState({});
  const [projectToView, setProjectToView] = useState({
    data: "",
    show: false,
  });
  const [projectToDelete, setProjectToDelete] = useState({
    data: "",
    show: false,
  });
  const [projects, setProjects] = useState({
    allprojects: [],
    active: [],
    scheduled: [],
    completed: [],
    delayed: [],
    onhold: [],
    sortedAsc: [],
    sortedDesc: [],
    myproject:[]
  });
  const [projectMap, setProjectMap]=useState("sortedDesc")


  useEffect(() => {
    axios
      .get("http://localhost:6006/user-details/fetchprojects")
      .then((res) => {
        let today = new Date();
        const tempData = res.data.map((obj) => {
          return { ...obj, date: new Date(obj.projectend) };
        });
        let allprojects = tempData.map((proj) => {
          if (proj.date.getTime() < today.getTime() && proj.projectstatus==="Active") {
            return { ...proj, projectstatus: "Delayed" };
          }
          return proj;
        });
        console.log("temp", allprojects);

        const arr1 = allprojects.map((obj) => {
          return { ...obj, date: new Date(obj.projectend) };
        });
        const arr2 = allprojects.map((obj) => {
          return { ...obj, date: new Date(obj.projectend) };
        });
        const sortedAsc = arr1.sort(
          (objA, objB) => Number(objA.date) - Number(objB.date)
        );
        const sortedDesc = arr2.sort(
          (objA, objB) => Number(objB.date) - Number(objA.date)
        );
        const active = allprojects.filter(
          (proj) => proj.projectstatus === "Active"
        );
        const toBeScheduled = allprojects.filter(
          (proj) => proj.projectstatus === "To Be Scheduled"
        );
        const completed = allprojects.filter(
          (proj) => proj.projectstatus === "Completed"
        );
        const onHold = allprojects.filter(
          (proj) => proj.projectstatus === "On Hold"
        );
        const delayed = allprojects.filter(
          (proj) => proj.projectstatus === "Delayed"
        );

        let user=localStorage.getItem("currUser")
        let a=JSON.parse(user)
        setCurrUser(a)
        let myprojects=[] 
        allprojects.map(proj =>{
           proj.team.map(t=>{
              if(t.empid===a.empid)
              myprojects.push(proj)
           })
          })

        setProjects({
          ...projects,
          sortedDesc: sortedDesc,
          sortedAsc: sortedAsc,
          active: active,
          scheduled: toBeScheduled,
          completed: completed,
          onhold: onHold,
          delayed: delayed,
          allprojects: allprojects,
          myproject:myprojects,
        });

        

        console.log("mine",myprojects);
      })
      .catch((err) => console.log(err));

  }, []);

  const setDelayed = () => {};

  const giveColor = (e) => {
    if ( e === "Active") {
      return "alert-green";
    } else if (e === "On Hold") {
      return "alert-yellow";
    } else if (e === "Delayed") {
      return "alert-red";
    } else {
      return "alert-gray";
    }
  };
  const deleteProj = () => {
    axios
      .get(
        "http://localhost:6006/user-details/deletethisproject/" +
          projectToDelete.data._id
      ).then((res)=>{
        toast.success('Project Deleted !!', {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
      })
      document.location.reload()
  };

  return (
    <>
      <div className="dashboard white-blk ">
        <div className="project-number-cont">
          <div style={{color:"green"}} className=" project-numbers">
            <div className="project-count">{projects.active.length}</div>
            <div>ACTIVE</div>
          </div>
          <div style={{color:"red"}} className="project-numbers">
            <div className="project-count">{projects.delayed.length}</div>
            <div>DELAYED</div>
          </div>
          <div style={{color:"#f5f500"}} className="project-numbers">
            <div className="project-count">{projects.onhold.length}</div>
            <div>ON HOLD</div>
          </div>
          <div style={{color:"gray"}} className="project-numbers">
            <div className="project-count">{projects.completed.length}</div>
            <div>COMPLETED</div>
          </div>
        </div>
      </div>
      <div className="dashboard white-blk ">
        <div >
          <h1>Projects</h1>
          <div style={{display:"flex", justifyContent:"flex-end", margin:"5px 20px"}}>
            <div >
            <span style={{marginRight:"10px"}}>Sort By</span>
            <select onChange={(e)=>setProjectMap(e.target.value)} name="cars" id="cars">
              <option  value="sortedDesc">All (recent)</option>
              <option value="myproject">My Projects</option>
              <option value="active">Active</option>
              <option value="delayed">Delayed</option>
              <option value="onhold">On Hold</option>
              <option value="completed">Completed</option>
              <option value="sortedAsc">All (old)</option>
            </select>
            </div>
          </div>
        </div>
        {/* {JSON.stringify(projectMap)} */}
        <Modal
          onRequestClose={() =>
            setProjectToDelete({ ...projectToDelete, show: false })
          }
          isOpen={projectToDelete.show}
          style={customStyles}
          ariaHideApp={false}
          contentLabel="Example Modal"
        >
          <div>
            <div className="modal-top-txt">
              Are you sure you want to delete {projectToDelete.data.projectname} ?
            </div>
            <div className="modal-top-txt">
              <button onClick={() => deleteProj()} className="simple-btn">
                delete
              </button>
              <button onClick={()=>setProjectToDelete({ ...projectToDelete, show: false })} className="simple-btn-white">No</button>
            </div>
          </div>
        </Modal>
        <Modal
          onRequestClose={() =>
            setProjectToView({ ...projectToView, show: false })
          }
          isOpen={projectToView.show}
          style={customStyles}
          ariaHideApp={false}
          contentLabel="Example Modal"
        >
          <div className="modal-div">
            <div className="form-box">
              <span className="label">Project Name:</span>
              <div>{projectToView.data.projectname}</div>
            </div>
            <div className="form-box">
              <span className="label">Project Start Date:</span>
              <div>
                {projectToView.data.projectstart
                  ?.split("T")[0]
                  .split("-")
                  .reverse()
                  .join("-")}
              </div>
            </div>
            <div className="form-box">
              <span className="label">Project End Date:</span>
              <div>
                {projectToView.data.projectend
                  ?.split("T")[0]
                  .split("-")
                  .reverse()
                  .join("-")}
              </div>
            </div>
            <div className="form-box">
              <span className="label">Project Description:</span>
              <div>{projectToView.data.description}</div>
            </div>
            <div className="form-box">
              <span className="label">Project Status:</span>
              <div>{projectToView.data.projectstatus}</div>
            </div>
            <div className="form-box">
              <span className="label">Created By:</span>
              <div>{projectToView.data.createdby}</div>
            </div>
            <div className="form-box">
              <span style={{ alignSelf: "start" }} className="label">
                Project Team:
              </span>
              <div>
                {projectToView.data.team?.map((emp) => {
                  return (
                    <div className="show-proj" key={emp.empid}>
                      <div>{emp.empid}</div><div>{emp.name}</div><div>{emp.role}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </Modal>
        <DashMenu user={currUser} />

        <div className="projects-list">
          <div className="list-head">
            <div>Project Name: </div>
            <div>Project End Date: </div>
            <div>Created By:</div>
            <div>Status: </div>
          </div>
          {
            projects[projectMap].length===0?<div style={{display:"flex",justifyContent:"center",}}>No projects found</div>:
          projects[projectMap]?.map((proj) => {
            return (
              <div key={proj._id}>
                <div>{proj.projectname}</div>
                <div>
                  {proj.projectend.split("T")[0].split("-").reverse().join("-")}
                </div>
                <div>
                  <span >
                  {proj.createdby}
                  </span>
                </div>
                <div className="list-btn">
                  <div>
                    <span
                      onClick={() =>
                        setProjectToView({ show: true, data: proj })
                      }
                    >
                      <GrFormView />
                    </span>
                  </div>
                  {
                    currUser?.adminstatus?<><div>
                    <span onClick={() => navigate("/EditProject/" + proj._id)}>
                      <FiEdit2 />
                    </span>
                  </div>
                  <div>
                    <span
                      onClick={() =>
                        setProjectToDelete({ show: true, data: proj })
                      }
                    >
                      <MdDeleteOutline />
                    </span>
                  </div></>:null
                  }
                    
                </div>
                <div className={giveColor(proj.projectstatus)}>
                  {proj.projectstatus}
                  </div>
              </div>
            );
          })}
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Dashboard;
