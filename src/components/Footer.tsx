"use client";
import React from "react";
import { Icons } from "./Icons";
import { themeChange } from "theme-change";

let isDarkmode = false;
let switchToggle: Element | null = null;
let switchToggle1: Element | null = null;
const ItemList: React.FC<{ content: string; style?: React.CSSProperties }> = ({
  content,
  style,
}) => (
  <li className="relative group w-max cursor-pointer">
    <a
      style={{
        ...style,
        color: style ? "var(--colors-warning)" : "var(--colors-text)",
      }}
    >
      {content}
    </a>
    <span
      className={`absolute -bottom-[2px] left-0 w-0 transition-all h-1 ${
        style ? "bg-[--colors-warning]" : "bg-[--colors-secondary]"
      } rounded group-hover:w-full`}
    />
  </li>
);

export default function Footer() {
  React.useEffect(() => {
    if (!switchToggle || !switchToggle1) {
      switchToggle = document.querySelector("#switch-toggle");
      switchToggle1 = document.querySelector("#switch-toggle1");
    }
    themeChange(false);
  }, []);
  function toggleTheme() {
    isDarkmode = !isDarkmode;
    localStorage.setItem("isDarkmode", JSON.stringify(isDarkmode));
    switchTheme();
  }

  function switchTheme() {
    if (isDarkmode && switchToggle) {
      switchToggle.classList.remove("bg-yellow-500", "-translate-x-1");
      switchToggle.classList.add("bg-gray-700", "translate-x-full");
      switchToggle1?.classList.remove("bg-yellow-500", "-translate-x-1");
      switchToggle1?.classList.add("bg-gray-700", "translate-x-full");
      setTimeout(() => {
        switchToggle!.innerHTML = darkIcon;
        switchToggle1!.innerHTML = darkIcon;
      }, 250);
    } else {
      switchToggle?.classList.add("bg-yellow-500", "-translate-x-1");
      switchToggle?.classList.remove("bg-gray-700", "translate-x-full");
      switchToggle1?.classList.add("bg-yellow-500", "-translate-x-1");
      switchToggle1?.classList.remove("bg-gray-700", "translate-x-full");
      setTimeout(() => {
        switchToggle!.innerHTML = lightIcon;
        switchToggle1!.innerHTML = lightIcon;
      }, 250);
    }
  }
  const [showElement, setShowElement] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const windowHeight =
        window.innerHeight || document.documentElement.clientHeight;
      const documentHeight = document.documentElement.scrollHeight;

      const scrollThreshold = 70;

      if (documentHeight - scrollTop - windowHeight < scrollThreshold) {
        setShowElement(true);
      } else {
        setShowElement(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <footer className="bg-[--colors-backgroundAlt]">
      <div className="relative container px-5 pt-14 mx-auto">
        <div className=" flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
          <div className="flex-grow gap-[33px] flex flex-wrap md:flex-nowrap  md:text-left text-center ">
            <div className="lg:w-1/3 md:w-1/2 text-left w-full ">
              <h2 className="font-bold text-[--colors-secondary] tracking-widest text-sm mb-3">
                ABOUT
              </h2>
              <nav className="list-none mb-10 leading-8">
                <ItemList
                  content="Contact"
                  style={{ color: "var(--colors-warning)" }}
                />
                <ItemList content="Brand" />
                <ItemList content="Blog" />
                <ItemList content="Community" />
                <ItemList content="Litepaper" />
                <ItemList content="" />
                <ItemList content="CAKE Emission Projection" />
                <ItemList content="Terms Of Service" />
              </nav>
            </div>
            <div className="lg:w-1/3 md:w-1/2 text-left w-full md:px-4">
              <h2 className="font-bold text-[--colors-secondary] tracking-widest text-sm mb-3">
                HELP
              </h2>
              <nav className="list-none mb-10 leading-8">
                <ItemList content="Customer Support" />
                <ItemList content="Troubleshooting" />
                <ItemList content="Guides" />
              </nav>
            </div>
            <div className="lg:w-1/3 md:w-1/2 text-left w-full md:px-4">
              <h2 className="font-bold text-[--colors-secondary] tracking-widest text-sm mb-3">
                DEVELOPERS
              </h2>
              <nav className="list-none mb-10 leading-8">
                <ItemList content="Github" />
                <ItemList content="Documentation" />
                <ItemList content="Bug Bounty" />
                <ItemList content="Audits" />
                <ItemList content="Careers" />
              </nav>
            </div>
          </div>
          <div className="w-64 flex-shrink-0 md:mx-0 md:h-[250px] flex items-start md:justify-center justify-start text-center md:text-left md:mt-0  order-first md:order-none mb-14 ">
            <h1 className="text-[--colors-secondary] text-3xl">Logo</h1>
          </div>

          <div className="md:hidden border-t-[1px] border-b-[1px] border-[#383241] mb-5 container -order-2 md:order-none md:justify-between items-center  py-10 flex md:flex-row md:flex-nowrap flex-wrap flex-col">
            <div className="md:mb-5 flex gap-5 items-center mt-5 md:w-3/6 w-full">
              <button
                className="w-20 h-10 rounded-full bg-white flex items-center transition duration-300 focus:outline-none shadow"
                onClick={toggleTheme}
                data-toggle-theme="dark,light"
              >
                <div
                  id="switch-toggle1"
                  className="w-10 h-10 relative rounded-full transition duration-500 transform bg-yellow-500 -translate-x-2 p-1 text-white"
                >
                  <Icons.SunIcon />
                </div>
              </button>
            </div>
            <div className="flex items-center gap-5 order-first md:order-none justify-between  w-full md:w-[45%] lg:w-[30%]">
              <div className="flex items-center gap-2">
                <Icons.RabbitIcon />
                <p className="text-[#ed4b9e] text-xl font-medium">$1.482</p>
              </div>
              <div className="text-[--colors-invertedContrast] flex w-[38%] md:w-[48%] px-2 items-center justify-center py-1 bg-[--colors-primary] rounded-full font-bold">
                <button className="text-xl">Buy Cake</button>
                <Icons.ArrowRight />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-10 mx-auto pb-4 md:pb-14 md:flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
          <div className="flex md:mx-0 mx-auto gap-5 pb-5 border-[#383241] border-b-[1px] w-full">
            <Icons.Twitter
              fill="var(--colors-textSubtle)"
              size={25}
              color="var(--colors-textSubtle)"
              cursor="pointer"
            />
            <Icons.Telegram />
            <Icons.Reddit />
            <Icons.Instagram
              color="var(--colors-textSubtle)"
              size={25}
              cursor="pointer"
            />
            <Icons.GithubIcon
              color="var(--colors-textSubtle)"
              fill="var(--colors-textSubtle)"
              size={25}
              cursor="pointer"
            />

            <Icons.YoutubeIcon />
          </div>
        </div>
        {showElement && (
          <div
            className="fixed cursor-pointer right-[30px] bottom-[32px] md:right-[100px] md:bottom-[190px] flex w-[10%] md:w-[5%] items-center  justify-around py-3 bg-[--colors-primary] rounded-xl font-bold"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <Icons.ArrowUp size={20} />
          </div>
        )}
      </div>

      <div className="hidden container md:order-none md:justify-between items-center px-6 mx-auto pb-14 md:flex md:flex-row md:flex-nowrap flex-wrap flex-col">
        <div className="md:mb-5 flex gap-5 items-center mt-5 md:w-3/6 w-full">
          <button
            className="w-20 h-10 rounded-full bg-white flex items-center transition duration-300 focus:outline-none shadow"
            onClick={toggleTheme}
            data-toggle-theme="dark,light"
          >
            <div
              id="switch-toggle"
              className="w-10 h-10 relative rounded-full transition duration-500 transform bg-yellow-500 -translate-x-2 p-1 text-white"
            >
              <Icons.SunIcon />
            </div>
          </button>
        </div>
        <div className="flex items-center gap-5 order-first md:order-none justify-between  w-full md:w-[45%] lg:w-[30%]">
          <div className="flex items-center gap-2">
            <Icons.RabbitIcon />
            <p className="text-[#ed4b9e] text-xl font-medium">$1.482</p>
          </div>
          <div className="text-[--colors-invertedContrast] flex w-[30%] md:w-[48%] px-2 items-center py-1 justify-center bg-[--colors-primary] rounded-full font-bold">
            <button className=" text-2xl">Buy Cake</button>
            <Icons.ArrowRight />
          </div>
        </div>
      </div>
    </footer>
  );
}

const darkIcon = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
</svg>`;

const lightIcon = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
</svg>`;
