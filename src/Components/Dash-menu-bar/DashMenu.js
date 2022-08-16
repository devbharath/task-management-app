import React, { useState } from 'react'
import style from "../Global CSS/style.css";
import {MdOutlineDashboard} from 'react-icons/md'
import {AiOutlinePlusSquare} from 'react-icons/ai'
import {FaRegEdit} from 'react-icons/fa'
import {RiSettings3Line} from 'react-icons/ri'
import {MdLogout} from 'react-icons/md'
import {CgProfile} from 'react-icons/cg'
import MenuFloatBtn from '../Menu-Float-Btn/MenuFloatBtn';
import { useNavigate,Link } from 'react-router-dom';


const DashMenu = () => {
  let navigate=useNavigate()

  const [btns,setBtns]=useState({
    addBtn:false,
    editBtn:false
  })
  return (
    <div className='dashmenu'>
        
        <div className='menu-top'>
            <div className='profile'><CgProfile/></div>
            <div onClick={()=>navigate("/:id/Dashboard") }><MdOutlineDashboard/></div>
            <div  className='addbtn' onClick={()=>setBtns({addBtn:!btns.addBtn})}><AiOutlinePlusSquare />
            {
              btns.addBtn?<MenuFloatBtn
              btn1={<Link to='/AddProject'>Add Project</Link>}
              btn2={<Link to='/AddEmployee'>Add Employee</Link>}/>:null
            }
            
            </div>
            <div className='editbtn' onClick={()=>setBtns({editBtn:!btns.editBtn})}><FaRegEdit/>
            {
                btns.editBtn?<MenuFloatBtn
                btn1={<Link to='/EditProject'>Edit Project</Link>}
                btn2={<Link to='/AddEmployee'>Edit Employee</Link>}/>:null
            }
            </div>
        </div>
        <div className='menu-bottom'>
            <div><RiSettings3Line/></div>
            <div><MdLogout/></div>
        </div>
        
    </div>
  )
}

export default DashMenu