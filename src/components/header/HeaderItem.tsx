"use client";
import React from "react";
import Link from "next/link";
import { Icons } from "../Icons";

interface IHeaderItem {
  data: {
    id: string;
    link: string;
    title: string;
    renderDot: string | null;
    items: {
      title: string;
      link: string;
      subContent?: { text: string; color: string };
    }[];
  };
}

const HeaderItem: React.FC<IHeaderItem> = ({ data }) => {
  const ListSubContentIconLogOut = [
    "Perpetual",
    "Bridge",
    "Pancake Protectors",
    "Blog",
    "Docs",
  ];

  const ListSubContentStatus = ["Buy Crypto", "Trading Reward", "IFO"];

  const renderMainTitle = (title: string) => {
    if (title === "MORE")
      return (
        <div className="relative w-[21px]">
          <div className="absolute top-[-14px] text-2xl h-4 flex items-center leading-none">
            ...
          </div>
        </div>
      );

    return title;
  };

  const renderDotTemplate = (css: string | null) => {
    if (css === null) return null;
    return <span className={`!w-[8px] !h-[8px] rounded-full ${css}`} />;
  };

  const renderSubContent = (item: {
    title: string;
    link: string;
    subContent?: { text: string; color: string };
  }) => {
    if (ListSubContentIconLogOut.includes(item.title)) return <Icons.LogOut />;

    if (ListSubContentStatus.includes(item.title))
      return (
        <div
          className={`font-bold px-2 py-1 !border-2 !border-solid rounded-2xl border-[${item?.subContent?.color}] text-[${item?.subContent?.color}]`}
          style={{ borderColor: `var(${item?.subContent?.color})` }}
        >
          {item?.subContent?.text}
        </div>
      );

    return null;
  };

  const renderNavSubItem = (
    listSubItem: {
      title: string;
      link: string;
      subContent?: { text: string; color: string };
    }[]
  ) => {
    return listSubItem?.map((item, index) => {
      return (
        <li
          key={`${item.title}_${index}`}
          className="hover:bg-[--colors-tertiary] h-[48px] flex justify-between items-center flex-nowrap flex-row px-4"
        >
          <span className="p-0 font-semibold">{item.title}</span>
          <span className="p-0">{renderSubContent(item)}</span>
        </li>
      );
    });
  };

  return (
    <div key={data.id} className="dropdown dropdown-hover">
      <div className="p-2 px-1 xl:px-2">
        <label
          tabIndex={0}
          className="btn text-[--colors-textSubtle] flex-nowrap gap-3 border-0 !m-0 py-4 px-2 xl:p-4 !min-h-fit !normal-case !rounded-[20px] hover:bg-[--colors-tertiary] h-[48px] font-bold"
        >
          <Link href={data.link}>{renderMainTitle(data.title)}</Link>
          {renderDotTemplate(data.renderDot)}
        </label>
      </div>

      {data.items?.length !== 0 ? (
        <ul
          tabIndex={0}
          className="dropdown-content z-10 menu px-0 shadow bg-[--colors-backgroundAlt] text-[--colors-textSubtle] rounded-box min-w-[280px] border-2 border-solid border-[--colors-cardBorder]"
        >
          {renderNavSubItem(data.items)}
        </ul>
      ) : null}
    </div>
  );
};

export default HeaderItem;
