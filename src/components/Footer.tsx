"use client";
import React from "react";
import { Icons } from "./Icons";
import ChangeMode from "./ui/ChangeMode";

export default function Footer() {
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
          <div className="w-64 md:mx-0 md:h-[250px] flex items-start md:justify-end lg:justify-center justify-start text-center md:text-left md:mt-0  order-first md:order-none mb-14 ">
            <h1 className="text-[--colors-secondary] text-3xl">Logo</h1>
          </div>

          <div className="md:hidden border-t-[1px] border-b-[1px] border-[#383241] mb-5 container -order-2 md:order-none md:justify-between items-center  py-10 flex md:flex-row md:flex-nowrap flex-wrap flex-col">
            <div className="mr-auto mt-5">
              <ChangeMode />
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
            onClick={() => {
              if (typeof window !== "undefined")
                window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <Icons.ArrowUp size={20} />
          </div>
        )}
      </div>

      <div className="hidden container md:order-none md:justify-between items-center px-6 mx-auto pb-14 md:flex md:flex-row md:flex-nowrap flex-wrap flex-col">
        <ChangeMode />
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
