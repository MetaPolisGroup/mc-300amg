import React, { useState } from "react";
import { motion } from "framer-motion";
import { Icons } from "../Icons";
import { themeChange } from "theme-change";

interface IChangeModeProps {
  HWrapper?: string | number;
  WWrapper?: string | number;
  H?: string | number;
  W?: string | number;
}

const ChangeMode: React.FC<IChangeModeProps> = (props) => {
  const { H, HWrapper, W, WWrapper } = props;
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
      className={`transition-colors duration-500 flex-start flex h-[${
        HWrapper ?? "50px"
      }] w-[${WWrapper ?? "100px"}] rounded-[50px] ${
        isOn ? "bg-yellow-300" : "bg-black/90"
      } p-[5px] shadow-inner hover:cursor-pointer  ${
        isOn && "place-content-end"
      }`}
      data-toggle-theme="dark,light"
    >
      <motion.div
        className={`flex h-[${H ?? "40px"}] w-[${
          W ?? "40px"
        }] items-center justify-center rounded-full ${
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
