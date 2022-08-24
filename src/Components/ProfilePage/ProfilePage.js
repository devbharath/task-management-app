import React, { useState, useEffect, useContext } from "react";
import DashMenu from "../Dash-menu-bar/DashMenu";
import axios from "axios";
import "../Global CSS/style.css";
import { VscAccount } from "react-icons/vsc";


const ProfilePage = () => {
    const [currUser, setCurrUser]=useState({})
    const [isRequested, setIsRequested]=useState(false)


    useEffect(()=>{
        let user=localStorage.getItem("currUser")
        let a=JSON.parse(user)
        setCurrUser(a)
        if(a.adminrequest===true)
            setIsRequested(true)
    },[])

    const handleCkh=(e)=>{
        console.log(e)
        let requested
        if(e.target.checked){
           setIsRequested(true)
           requested=true
        }
        else{
            setIsRequested(false)
            requested=false
        }

            let dataToSend={
                "adminrequest":requested,
                _id:currUser._id
            }
            console.log(dataToSend)
        
            axios.post("http://localhost:6006/user-details/changerequest",dataToSend)
                alert("done")
                let b=currUser
                 b.adminrequest=requested
                localStorage.setItem("currUser",JSON.stringify(b))
    }
  return (
    <div>
        <DashMenu/>      
        <div className="white-blk myprofile">
        <div>
          <div><VscAccount/></div>
          <div className="profile-label">Name</div>
          <div style={{fontSize:"50px", fontWeight:"600",}}>{currUser.name?.toUpperCase()}</div>
        </div>
        <div>
          <div className="profile-label">Employee ID</div>
          <div className="profile-details">{currUser.empid?.toUpperCase()}</div>
        </div>
        <div>
          <div className="profile-label">Admin Status:</div>
          <div className="profile-details">{currUser.adminstatus===true?<span>Admin</span>:<span>No</span>}</div>
        </div>
        {
            currUser.adminstatus===true?null:<div className="profile-label" style={{display:"flex", justifyContent:"center", alignItems:"center",gap:"20px"}}>
            <div>Request Admin Status:</div>
            <div>
              <label class="switch">
                <input type="checkbox" checked={isRequested} onChange={(e)=>handleCkh(e)} value={isRequested}/>
                <span class="slider round"></span>
              </label>
            </div>
          </div>
        }
        
      </div>
    </div>
  );
};

export default ProfilePage;
