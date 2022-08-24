import React, { useState, useContext, useEffect } from "react";
import style from "../Global CSS/style.css";
import { MdOutlineDashboard } from "react-icons/md";
import { AiOutlinePlusSquare } from "react-icons/ai";
import { AiOutlineBell } from "react-icons/ai";
import { FaRegEdit } from "react-icons/fa";
import { RiSettings3Line } from "react-icons/ri";
import { MdLogout } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import MenuFloatBtn from "../Menu-Float-Btn/MenuFloatBtn";
import { useNavigate, Link } from "react-router-dom";
import { UserDetails } from "../../App";
import Modal from "react-modal";
import axios from "axios";
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

const DashMenu = () => {
  let navigate = useNavigate();
  const [logoutConf, setLogoutConf] = useState(false);
  const [createRole, setCreateRole] = useState({
    show: false,
    data: "",
  });

  const [btns, setBtns] = useState({
    addBtn: false,
    editBtn: false,
  });
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (localStorage.getItem("currUser") !== null) {
      let user = localStorage.getItem("currUser");
      let a = JSON.parse(user);
      if((window.location.href.split('/').pop()==="AddEmployee" || "AddProject" || "EditProject" || "Notify")&& (a.adminstatus===false))
        navigate("/DashBoard")
      setUser(a);
    } else {
      navigate("/");
    }
  }, []);
  const logout = () => {
    localStorage.clear();
    // document.location.reload()
    navigate("/");
  };

  const sendRole = () => {
    axios
      .post("http://localhost:6006/user-details/Addrole", createRole)
      .then((res) => {
        setCreateRole({show: false })
        toast.success('Role Created !!', {
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
  return (
    <>
    <div className="dashmenu">
      <Modal
        onRequestClose={() => setLogoutConf(false)}
        isOpen={logoutConf}
        style={customStyles}
        ariaHideApp={false}
        contentLabel="Example Modal"
      >
        <div className="modal-top-txt">Are you sure you want to log out?</div>
        <div className="modal-top-txt">
          <button onClick={() => logout()} className="simple-btn">
            Log Out
          </button>
          <button
            onClick={() => setLogoutConf(false)}
            className="simple-btn-white"
          >
            Cancel
          </button>
        </div>
      </Modal>
      <Modal
        onRequestClose={() => setCreateRole({ ...createRole, show: false })}
        isOpen={createRole.show}
        style={customStyles}
        ariaHideApp={false}
        contentLabel="Example Modal"
      >
        <div className="modal-top-txt">Enter new role:</div>
        <div>
          <input className="modal-top-txt input-simple" onChange={(e)=>setCreateRole({ ...createRole, data: e.target.value })} type="text"></input>
        </div>
        <div className="modal-top-txt">
          <button onClick={() => sendRole()} className="simple-btn">
            Create
          </button>
        </div>
      </Modal>
      <div className="menu-top">
        <div className="profile" onClick={() => navigate("/ProfilePage")}>
          <CgProfile />
        </div>
        <div onClick={() => navigate("/Dashboard")}>
          <MdOutlineDashboard />
        </div>
        {user?.adminstatus ? (
          <div
            className="addbtn"
            onClick={() => setBtns({ addBtn: !btns.addBtn })}
          >
            <AiOutlinePlusSquare />
            {btns.addBtn ? (
              <MenuFloatBtn
                btn1={<Link to="/AddProject">Add Project</Link>}
                btn2={<Link to="/AddEmployee">Add Employee</Link>}
                btn3={"Add Role"}
                onclick3={() => setCreateRole({ ...createRole, show: true })}
              />
            ) : null}
          </div>
        ) : null}

        {user?.adminstatus ? (
          <div
            className="editbtn"
            onClick={() => navigate("/Notify")}
          >
            <AiOutlineBell />
            
          </div>
        ) : null}
      </div>
      <div className="menu-bottom">
        <div>
          <RiSettings3Line />
        </div>
        <div onClick={() => setLogoutConf(true)}>
          <MdLogout />
        </div>
      </div>
    </div>      <ToastContainer />
</>
  );
};

export default DashMenu;
