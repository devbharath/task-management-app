import React from "react";

const MenuFloatBtn = (props) => {
  return (
    <div  className="MenuFloatBtn">
      <ul>
        <li>{props.btn1}</li>
        <li>{props.btn2}</li>
        {/* <li>{props?.btn3}</li> */}
      </ul>
    </div>
  );
};

export default MenuFloatBtn;
