"use client";

import React, { useState } from "react";

import clsx from "clsx";
import { NAV_SUB_HEADER } from "@/constants/navConstants";

const SubMenu = () => {
  const [navSelected, setNavSelected] = useState<string>("SubMenu1");

  return (
    <div className="nav bg-[--colors-backgroundAlt2]">
      <div className="navbar-center flex justify-center">
        <ul className="menu menu-horizontal overflow-x-auto flex-nowrap lg:flex-wrap !p-0 gap-[40px] items-center">
          {NAV_SUB_HEADER.map((nav) => (
            <li
              key={nav.id}
              className={clsx(
                "text-[--colors-textSubtle] font-semibold flex items-center justify-between hover:bg-[--colors-tertiary]",
                nav.id === navSelected && "!text-[--colors-secondary]"
              )}
              onClick={() => {
                setNavSelected(nav.id);
              }}
            >
              <a
                className="p-0  h-[40px] flex items-center justify-center px-1"
                href={nav.ref}
              >
                {nav.title}
              </a>

              <div
                className={clsx(
                  "w-full !h-[4px] !p-0",
                  nav.id === navSelected &&
                    "bg-[--colors-primary] hover:bg-[--colors-primary] !rounded-t-md !rounded-b-none"
                )}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SubMenu;
