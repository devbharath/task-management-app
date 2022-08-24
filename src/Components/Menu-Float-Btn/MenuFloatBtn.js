import React from "react";

const MenuFloatBtn = (props) => {
  return (
    <div  className="MenuFloatBtn">
      <ul>
        <li style={{display:props.disable1}}onClick={props.onclick1}>{props.btn1}</li>
        <li style={{display:props.disable2}}onClick={props.onclick2}>{props.btn2}</li>
        <li style={{display:props.disable3}} onClick={props.onclick3}>{props?.btn3}</li>
      </ul>
    </div>
  );
};

export default MenuFloatBtn;
