import React, { useEffect, useState } from "react";
import Button from "../ui/Button";
import Dice from "react-dice-roll";
import getDataFileredByOnSnapshot from "@/helpers/getDataFilteredByOnSnapshot";
import { DocumentData } from "firebase/firestore";

enum EMode {
  OVER = 1,
  UNDER,
}

const BetDice = () => {
  const [color, setColor] = useState("#922922");
  const [isActive, setIsActive] = useState<EMode | undefined>();
  const [diceData, setDiceData] = useState<IDiceData[]>([]);

  const handleChangeMode = (mode: EMode) => {
    setIsActive(mode);
    setColor(isActive !== EMode.OVER ? "#FFFFFF" : "black");
  };

  useEffect(() => {
    getDataFileredByOnSnapshot(
      "dices",
      [
        ["closed", "==", false],
        ["cancel", "==", false],
      ],
      (docs: DocumentData) => {
        setDiceData(docs as IDiceData[]);
      }
    );
  }, []);

  console.log(diceData);

  return (
    <div className="overflow-hidden flex justify-center py-5">
      <div className="relative">
        <div
          style={{ borderColor: color }}
          className={`w-[272px] md:w-[496px] md:h-[584px] relative z-10 h-[272px] flex justify-center m-auto flex-col rounded-[40px] bg-[#922922] border-[3px] md:border-[7px] items-center p-[40px]`}
        >
          <div className="mx-auto w-[142px] h-[142px] mb-6 rounded-full md:hidden bg-[#B53D2D]" />
          <div className="mx-auto w-[310px] rounded-full h-[310px] mb-6 hidden md:flex md:flex-col justify-center items-center gap-5 bg-[#B53D2D]">
            <Dice
              cheatValue={2}
              size={70}
              onRoll={(value) => console.log(value)}
            />
            <div className="flex gap-5">
              <Dice
                cheatValue={4}
                size={70}
                onRoll={(value) => console.log(value)}
              />
              <Dice
                cheatValue={3}
                size={70}
                onRoll={(value) => console.log(value)}
              />
            </div>
          </div>
          <div
            style={{
              backgroundColor: color === "#922922" ? "#FFD3AA" : color,
            }}
            className={`w-[218px] h-[58px] md:w-[384px] md:h-[125px] rounded-[20px] flex justify-center items-center`}
          >
            <div className="text-5xl text-[#922922] font-bold">
              <CountdownTimer initialTime={60} />
            </div>
          </div>
        </div>
        <div className="flex gap-[10px] my-[20px] md:absolute md:top-[15px] md:gap-[260px] md:-left-[500px]">
          <div
            className="hidden md:block ml-[150px] relative cursor-pointer"
            // onClick={() => handleChangeMode(EMode.OVER)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="700"
              height="468"
              viewBox="0 0 787 468"
              fill="none"
            >
              <path
                d="M296.681 467.827L727 467.827C760.137 467.827 787 440.964 787 407.827L787 60.1732C787 27.0361 760.137 0.173094 727 0.173095L296.681 0.173092C283.893 0.173092 271.44 4.25886 261.137 11.8345L24.7388 185.661C-7.86915 209.638 -7.86915 258.362 24.7388 282.339L261.137 456.165C271.44 463.741 283.893 467.827 296.681 467.827Z"
                fill={isActive === EMode.OVER ? "#FFFFFF" : "#FFD3AA"}
              />
            </svg>
            <div className="flex flex-col absolute top-[130px] left-[20px] w-[300px] right-[15px]">
              <span className="text-3xl text-[#EE6033] font-bold text-right uppercase">
                Roll under
              </span>
              <div className="my-5 ml-auto relative">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="219"
                  height="72"
                  viewBox="0 0 219 72"
                  fill="none"
                >
                  <path
                    d="M8.43217 36.3489C-7.16124 24.8827 1.00216 0.161789 20.3574 0.236344L198.687 0.923258C209.703 0.965689 218.61 9.90749 218.61 20.9231V52C218.61 63.0457 209.656 72 198.61 72H63.477C59.2143 72 55.0631 70.638 51.6288 68.1127L8.43217 36.3489Z"
                    fill="#EE6033"
                  />
                </svg>
                <span className="text-xl left-1/2 transform -translate-x-[40%] top-[30%] absolute text-white">
                  0,000,000,000.0
                </span>
              </div>
              <Button className="bg-gradient-to-br from-[#FFBA88] to-[#EE6033] rounded-[20px] p-2 w-[107px] h-[40px] ml-auto">
                Bet
              </Button>
            </div>
          </div>
          <div
            className="hidden md:block absolute -right-[480px] top-[5px] cursor-pointer"
            // onClick={() => handleChangeMode(EMode.UNDER)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="700"
              height="468"
              viewBox="0 0 787 468"
              fill="none"
            >
              <path
                d="M490.319 0.173167L60 0.173158C26.8629 0.173157 5.25638e-06 27.0361 4.86122e-06 60.1732L7.15494e-07 407.827C3.20338e-07 440.964 26.8629 467.827 60 467.827L490.319 467.827C503.107 467.827 515.56 463.741 525.863 456.166L762.261 282.339C794.869 258.362 794.869 209.638 762.261 185.661L525.863 11.8345C515.56 4.25892 503.107 0.173167 490.319 0.173167Z"
                fill={isActive === EMode.UNDER ? "#303030" : "#FFD3AA"}
              />
            </svg>
            <div className="flex flex-col absolute top-[130px]  w-[300px] right-[5px]">
              <span className="text-3xl text-[#EE6033] font-bold text-left uppercase">
                Roll Over
              </span>
              <div className="my-5 mr-auto relative">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="219"
                  height="72"
                  viewBox="0 0 219 72"
                  fill="none"
                >
                  <path
                    d="M210.669 36.3489C226.263 24.8827 218.099 0.161789 198.744 0.236344L20.4144 0.923258C9.39882 0.965689 0.491394 9.90749 0.491394 20.9231V52C0.491394 63.0457 9.44571 72 20.4914 72H155.625C159.887 72 164.039 70.638 167.473 68.1127L210.669 36.3489Z"
                    fill="#B53D2D"
                  />
                </svg>
                <span className="text-xl left-1/2 transform -translate-x-[55%] top-[30%] absolute text-white">
                  0,000,000,000.0
                </span>
              </div>
              <Button className="bg-gradient-to-br from-[#FFBA88] to-[#EE6033] rounded-[20px] p-2 w-[107px] h-[40px] mr-auto">
                Bet
              </Button>
            </div>
          </div>
          <div
            className="relative md:hidden cursor-pointer"
            // onClick={() => handleChangeMode(EMode.OVER)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="158"
              height="138"
              viewBox="0 0 158 138"
              fill="none"
            >
              <path
                d="M82.017 138L138 138C149.046 138 158 129.046 158 118L158 20C158 8.9543 149.046 -4.35715e-07 138 -9.73197e-07L82.017 -6.94595e-07C77.5065 -7.35827e-07 73.1284 1.52466 69.5937 4.32643L7.77412 53.3264C-2.3281 61.3338 -2.3281 76.6662 7.77412 84.6736L69.5937 133.674C73.1284 136.475 77.5065 138 82.017 138Z"
                fill={isActive === EMode.OVER ? "#FFFFFF" : "#FFD3AA"}
              />
            </svg>
            <div className="flex flex-col absolute top-[25px] right-[15px]">
              <span className=" text-sm text-[#EE6033] font-bold text-right uppercase">
                Roll under
              </span>
              <div className="my-2 relative">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="114"
                  height="38"
                  viewBox="0 0 114 38"
                  fill="none"
                >
                  <path
                    d="M4.33922 17.9402C-3.0461 12.0177 1.16815 0.10151 10.6348 0.138863L103.794 0.506441C109.302 0.528172 113.755 4.99892 113.755 10.5064V27.456C113.755 32.9789 109.278 37.456 103.755 37.456H32.19C29.9153 37.456 27.7086 36.6805 25.934 35.2574L4.33922 17.9402Z"
                    fill="#EE6033"
                  />
                </svg>
                <span className="text-[10px] left-1/2 transform -translate-x-[40%] top-[30%] absolute text-white">
                  0,000,000,000.0
                </span>
              </div>
              <Button className="bg-gradient-to-br from-[#FFBA88] to-[#EE6033] rounded-[20px] p-2 w-[85px] h-[20px] ml-auto">
                Bet
              </Button>
            </div>
          </div>
          <div
            className="relative md:hidden cursor-pointer"
            // onClick={() => handleChangeMode(EMode.UNDER)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="158"
              height="138"
              viewBox="0 0 158 138"
            >
              <path
                d="M75.983 1.61985e-06L20 4.26371e-07C8.9543 1.90893e-07 -3.49494e-06 8.9543 -3.62666e-06 20L-4.7953e-06 118C-4.92701e-06 129.046 8.9543 138 20 138L75.983 138C80.4935 138 84.8716 136.475 88.4063 133.674L150.226 84.6736C160.328 76.6663 160.328 61.3338 150.226 53.3264L88.4063 4.32643C84.8716 1.52466 80.4935 1.71601e-06 75.983 1.61985e-06Z"
                fill={isActive === EMode.UNDER ? "#303030" : "#FFD3AA"}
              />
            </svg>
            <div className="flex flex-col absolute top-[25px] right-[30px]">
              <span className="text-sm text-[#EE6033] font-bold text-left uppercase">
                Roll Over
              </span>
              <div className="my-2 relative">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="112"
                  height="38"
                  viewBox="0 0 112 38"
                  fill="none"
                >
                  <path
                    d="M107.288 18.1509C115.042 12.397 110.946 0.0820907 101.289 0.120192L9.96054 0.480561C4.45314 0.502292 0 4.97304 0 10.4805V27.4302C0 32.953 4.47715 37.4302 10 37.4302H77.9997C80.1458 37.4302 82.235 36.7397 83.9585 35.4609L107.288 18.1509Z"
                    fill="#B53D2D"
                  />
                </svg>
                <span className="text-[10px] left-1/2 transform -translate-x-[55%] top-[30%] absolute text-white">
                  0,000,000,000.0
                </span>
              </div>
              <Button className="bg-gradient-to-br from-[#FFBA88] to-[#EE6033] rounded-[20px] p-2 w-[85px] h-[20px] mr-auto">
                Bet
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BetDice;

const CountdownTimer: React.FC<{ initialTime: number }> = ({ initialTime }) => {
  const [time, setTime] = useState(initialTime);
  React.useEffect(() => {
    const interval = setInterval(() => {
      setTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return <span>{formatTime(time)}</span>;
};
