import React from "react";

const SubMenu = () => {
  return (
    <nav className="nav">
      <div className="navbar-center flex justify-center">
        <ul className="menu menu-horizontal px-1 overflow-x-auto flex-nowrap lg:flex-wrap">
          <li className="text-[--colors-textSubtle] font-normal">
            <a>Prediction (BETA)</a>
          </li>
          <li className="text-[--colors-textSubtle] font-normal">
            <a>Trading Reward</a>
          </li>
          <li className="text-[--colors-textSubtle] font-normal">
            <a>Trading Competition</a>
          </li>
          <li className="text-[--colors-textSubtle] font-normal">
            <a>Lottery</a>
          </li>
          <li className="text-[--colors-textSubtle] font-normal">
            <a>Pottery (BETA)</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default SubMenu;
