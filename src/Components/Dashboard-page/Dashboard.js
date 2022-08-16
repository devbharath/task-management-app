import React,{useState,useEffect} from "react";
import DashMenu from "../Dash-menu-bar/DashMenu";
import { UserDetails } from "../../App";
import axios from "axios"
import "../Global CSS/style.css";


const Dashboard = () => {
  const conValue = React.useContext(UserDetails);  
  console.log(conValue?.state?.user?.name) 

  const [showAdd,setShowAdd]=useState(false)
  const [showEdit,setShowEdit]=useState(false)
  const [projects, setProjects]=useState({
    allprojects:[],
    activeprojects:[],
    scheduledproj:[],
    closedprojects:[] 
  })
 
useEffect(() => {
  axios.get("http://localhost:6006/user-details/:id/fetchproject")
  .then((res)=>{
      setProjects({...projects,allprojects:res.data})
      console.log(res)
  })
  .catch((err)=>console.log(err))

}, [])

  return (
    <div className="dashboard white-blk ">
      <DashMenu />
      {/* Welcome  {conValue?.state?.user?.name}

      {
        JSON.stringify(projects)
      } */}
      <div className='projects-list'>
        {
          projects.allprojects.map((e)=>{
            return <div>
              <div>
                {e.projectname}
              </div>
              <div>
                {e.projectend.split("T")[0].split("-").reverse().join("-")}
              </div>
              <div>
                {e.status}
              </div>
            </div>
          })
        }
      </div>
    </div>
  );
};

export default Dashboard;
