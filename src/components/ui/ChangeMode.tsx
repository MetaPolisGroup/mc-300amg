import React, { useState } from "react";
import { motion } from "framer-motion";
import { Icons } from "../Icons";
import { themeChange } from "theme-change";

const ChangeMode = () => {
  const [isOn, setIsOn] = useState(false);
  const toggleSwitch = () => {
    setIsOn((prev) => !prev);
    localStorage.setItem("isDarkmode", JSON.stringify(isOn));
  };
  const spring = {
    type: "spring",
    stiffness: 700,
    damping: 30,
  };
  React.useEffect(() => {
    themeChange(false);
  }, []);
  return (
    <div
      onClick={toggleSwitch}
      className={`transition-colors duration-500 flex-start flex h-[50px] w-[100px] rounded-[50px] ${
        isOn ? "bg-yellow-300" : "bg-black/90"
      } p-[5px] shadow-inner hover:cursor-pointer  ${
        isOn && "place-content-end"
      }`}
      data-toggle-theme="dark,light"
    >
      <motion.div
        className={`flex h-[40px] w-[40px] items-center justify-center rounded-full ${
          isOn ? "bg-yellow-500" : "bg-gray-800"
        }`}
        layout
        transition={{ ...spring }}
        whileTap={{ rotate: 360 }}
      >
        <div>
          {isOn ? (
            <Icons.SunDim color="white" />
          ) : (
            <Icons.MoonStar color="white" />
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default ChangeMode;
