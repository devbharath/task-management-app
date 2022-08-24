import React, {useEffect, useReducer} from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./Components/Login-page/Login";
import SignUp from "./Components/SignUp/SignUp";
import Dashboard from "./Components/Dashboard-page/Dashboard";
import AddProject from "./Components/Add-Project.js/AddProject";
import EditProject from "./Components/EditProject/EditProject";
import AddEmployee from "./Components/AddEmployee/AddEmployee";
import ProfilePage from "./Components/ProfilePage/ProfilePage"
import Notify from "./Components/Notify/Notify"


export const UserDetails = React.createContext();


const initialState = {
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'CURRENT_USER': {
      console.log("Current user triggered");
      localStorage.setItem("currUser",JSON.stringify(action.payload[0]))
      return {user:action.payload[0]}
    }
    
    default: {
      return state;
    }
  }
};




function App() {

  const [state, dispatch] = useReducer(reducer, initialState);




  

  return (
    <UserDetails.Provider value={{state,dispatch}}>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/SignUp" element={<SignUp />}></Route>
          <Route path="/Dashboard" element={<Dashboard />}></Route>
          <Route path="/AddProject" element={<AddProject />}></Route>
          <Route path="/EditProject/:id" element={<EditProject />}></Route>
          <Route path="/AddEmployee" element={<AddEmployee />}></Route>
          <Route path="/ProfilePage" element={<ProfilePage />}></Route>
          <Route path="/Notify" element={<Notify />}></Route>

        </Routes>
      </div>
    </UserDetails.Provider>
  );
}

export default App;
