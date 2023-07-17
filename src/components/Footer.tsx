"use client";
import React from "react";
import { Icons } from "./Icons";
import { themeChange } from "theme-change";

const darkIcon = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
</svg>`;

const lightIcon = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
</svg>`;

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
            <div className="lg:w-1/3 md:w-1/2 text-left w-full px-4">
              <h2 className="font-bold text-[--colors-secondary] tracking-widest text-sm mb-3">
                HELP
              </h2>
              <nav className="list-none mb-10 leading-8">
                <ItemList content="Customer Support" />
                <ItemList content="Troubleshooting" />
                <ItemList content="Guides" />
              </nav>
            </div>
            <div className="lg:w-1/3 md:w-1/2 text-left w-full px-4">
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
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                </div>
              </button>
            </div>
            <div className="flex items-center gap-5 order-first md:order-none justify-between  w-full md:w-[45%] lg:w-[30%]">
              <div className="flex items-center gap-2">
                <svg
                  viewBox="0 0 96 96"
                  width="40px"
                  color="text"
                  xmlns="http://www.w3.org/2000/svg"
                  className="sc-231a1e38-0 hfYbyS"
                >
                  <circle cx="48" cy="48" r="48" fill="#53DEE9"></circle>
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M47.858 79.875c-9.342-.007-16.866-2.249-22.124-6.275-5.321-4.075-8.144-9.857-8.144-16.4 0-6.304 2.817-10.85 6.004-13.923 2.497-2.408 5.253-3.95 7.172-4.838a99.818 99.818 0 01-1.46-4.876c-.648-2.41-1.284-5.237-1.284-7.309 0-2.452.535-4.915 1.977-6.829 1.523-2.021 3.816-3.104 6.574-3.104 2.156 0 3.986.8 5.42 2.179 1.369 1.318 2.28 3.07 2.91 4.895 1.106 3.208 1.537 7.238 1.657 11.26h2.643c.12-4.022.551-8.052 1.657-11.26.63-1.825 1.541-3.577 2.91-4.895 1.434-1.38 3.264-2.18 5.42-2.18 2.758 0 5.051 1.084 6.574 3.105 1.442 1.914 1.977 4.377 1.977 6.83 0 2.071-.636 4.898-1.284 7.308a99.707 99.707 0 01-1.46 4.876c1.919.888 4.675 2.43 7.172 4.838 3.187 3.073 6.004 7.619 6.004 13.923 0 6.543-2.823 12.325-8.144 16.4-5.257 4.026-12.782 6.268-22.124 6.275h-.047z"
                    fill="#633001"
                  ></path>
                  <path
                    d="M36.573 18.653c-4.04 0-5.9 3.045-5.9 7.256 0 3.347 2.16 10.05 3.048 12.66.199.587-.114 1.23-.686 1.458-3.238 1.29-12.794 6.012-12.794 16.828 0 11.393 9.711 19.983 27.619 19.997h.043c17.908-.014 27.619-8.604 27.619-19.997 0-10.816-9.556-15.539-12.794-16.828a1.176 1.176 0 01-.686-1.458c.887-2.61 3.048-9.313 3.048-12.66 0-4.211-1.86-7.256-5.9-7.256-5.816 0-7.266 8.322-7.37 17.254a1.084 1.084 0 01-1.074 1.08h-5.73c-.59 0-1.067-.484-1.074-1.08-.103-8.932-1.553-17.254-7.369-17.254z"
                    fill="#D1884F"
                  ></path>
                  <path
                    d="M47.903 73.202c-13.158 0-27.64-7.115-27.662-16.326v.043c0 11.403 9.727 19.997 27.662 19.997s27.661-8.594 27.661-19.997v-.043c-.022 9.21-14.503 16.326-27.661 16.326z"
                    fill="#FEDC90"
                  ></path>
                  <path
                    d="M40.592 54.047c0 3.11-1.455 4.73-3.25 4.73-1.794 0-3.249-1.62-3.249-4.73 0-3.11 1.455-4.73 3.25-4.73 1.794 0 3.249 1.62 3.249 4.73zM61.712 54.047c0 3.11-1.455 4.73-3.25 4.73-1.794 0-3.248-1.62-3.248-4.73 0-3.11 1.454-4.73 3.249-4.73 1.794 0 3.25 1.62 3.25 4.73z"
                    fill="#633001"
                  ></path>
                  <defs>
                    <linearGradient
                      id="paint0_linear_10493"
                      x1="48"
                      y1="0"
                      x2="48"
                      y2="96"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#53DEE9"></stop>
                      <stop offset="1" stopColor="#1FC7D4"></stop>
                    </linearGradient>
                  </defs>
                </svg>
                <p className="text-[#ed4b9e] text-xl font-medium">$1.482</p>
              </div>
              <div className="text-[--colors-invertedContrast] flex w-[30%] md:w-[48%] px-2 items-center justify-around py-1 bg-[--colors-primary] rounded-full font-bold">
                <button className="text-2xl">Buy Cake</button>
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

            <svg
              viewBox="0 0 30 30"
              xmlns="http://www.w3.org/2000/svg"
              width="25px"
              className="sc-231a1e38-0 gUXTeE"
              style={{ cursor: "pointer" }}
              fill="var(--colors-textSubtle)"
              color="var(--colors-textSubtle)"
            >
              <path d="M 15 4 C 10.814 4 5.3808594 5.0488281 5.3808594 5.0488281 L 5.3671875 5.0644531 C 3.4606632 5.3693645 2 7.0076245 2 9 L 2 15 L 2 15.001953 L 2 21 L 2 21.001953 A 4 4 0 0 0 5.3769531 24.945312 L 5.3808594 24.951172 C 5.3808594 24.951172 10.814 26.001953 15 26.001953 C 19.186 26.001953 24.619141 24.951172 24.619141 24.951172 L 24.621094 24.949219 A 4 4 0 0 0 28 21.001953 L 28 21 L 28 15.001953 L 28 15 L 28 9 A 4 4 0 0 0 24.623047 5.0546875 L 24.619141 5.0488281 C 24.619141 5.0488281 19.186 4 15 4 z M 12 10.398438 L 20 15 L 12 19.601562 L 12 10.398438 z"></path>
            </svg>
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            </div>
          </button>
        </div>
        <div className="flex items-center gap-5 order-first md:order-none justify-between  w-full md:w-[45%] lg:w-[30%]">
          <div className="flex items-center gap-2">
            <svg
              viewBox="0 0 96 96"
              width="40px"
              color="text"
              xmlns="http://www.w3.org/2000/svg"
              className="sc-231a1e38-0 hfYbyS"
            >
              <circle cx="48" cy="48" r="48" fill="#53DEE9"></circle>
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M47.858 79.875c-9.342-.007-16.866-2.249-22.124-6.275-5.321-4.075-8.144-9.857-8.144-16.4 0-6.304 2.817-10.85 6.004-13.923 2.497-2.408 5.253-3.95 7.172-4.838a99.818 99.818 0 01-1.46-4.876c-.648-2.41-1.284-5.237-1.284-7.309 0-2.452.535-4.915 1.977-6.829 1.523-2.021 3.816-3.104 6.574-3.104 2.156 0 3.986.8 5.42 2.179 1.369 1.318 2.28 3.07 2.91 4.895 1.106 3.208 1.537 7.238 1.657 11.26h2.643c.12-4.022.551-8.052 1.657-11.26.63-1.825 1.541-3.577 2.91-4.895 1.434-1.38 3.264-2.18 5.42-2.18 2.758 0 5.051 1.084 6.574 3.105 1.442 1.914 1.977 4.377 1.977 6.83 0 2.071-.636 4.898-1.284 7.308a99.707 99.707 0 01-1.46 4.876c1.919.888 4.675 2.43 7.172 4.838 3.187 3.073 6.004 7.619 6.004 13.923 0 6.543-2.823 12.325-8.144 16.4-5.257 4.026-12.782 6.268-22.124 6.275h-.047z"
                fill="#633001"
              ></path>
              <path
                d="M36.573 18.653c-4.04 0-5.9 3.045-5.9 7.256 0 3.347 2.16 10.05 3.048 12.66.199.587-.114 1.23-.686 1.458-3.238 1.29-12.794 6.012-12.794 16.828 0 11.393 9.711 19.983 27.619 19.997h.043c17.908-.014 27.619-8.604 27.619-19.997 0-10.816-9.556-15.539-12.794-16.828a1.176 1.176 0 01-.686-1.458c.887-2.61 3.048-9.313 3.048-12.66 0-4.211-1.86-7.256-5.9-7.256-5.816 0-7.266 8.322-7.37 17.254a1.084 1.084 0 01-1.074 1.08h-5.73c-.59 0-1.067-.484-1.074-1.08-.103-8.932-1.553-17.254-7.369-17.254z"
                fill="#D1884F"
              ></path>
              <path
                d="M47.903 73.202c-13.158 0-27.64-7.115-27.662-16.326v.043c0 11.403 9.727 19.997 27.662 19.997s27.661-8.594 27.661-19.997v-.043c-.022 9.21-14.503 16.326-27.661 16.326z"
                fill="#FEDC90"
              ></path>
              <path
                d="M40.592 54.047c0 3.11-1.455 4.73-3.25 4.73-1.794 0-3.249-1.62-3.249-4.73 0-3.11 1.455-4.73 3.25-4.73 1.794 0 3.249 1.62 3.249 4.73zM61.712 54.047c0 3.11-1.455 4.73-3.25 4.73-1.794 0-3.248-1.62-3.248-4.73 0-3.11 1.454-4.73 3.249-4.73 1.794 0 3.25 1.62 3.25 4.73z"
                fill="#633001"
              ></path>
              <defs>
                <linearGradient
                  id="paint0_linear_10493"
                  x1="48"
                  y1="0"
                  x2="48"
                  y2="96"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#53DEE9"></stop>
                  <stop offset="1" stopColor="#1FC7D4"></stop>
                </linearGradient>
              </defs>
            </svg>
            <p className="text-[#ed4b9e] text-xl font-medium">$1.482</p>
          </div>
          <div className="text-[--colors-invertedContrast] flex w-[30%] md:w-[48%] px-2 items-center justify-around py-1 bg-[--colors-primary] rounded-full font-bold">
            <button className=" text-2xl">Buy Cake</button>
            <Icons.ArrowRight />
          </div>
        </div>
      </div>
    </footer>
  );
}
