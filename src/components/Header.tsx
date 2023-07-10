import React from "react";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 h-14 w-full z-20">
      <nav className="flex justify-between items-center w-full h-full bg-[--color-backgroundAlt] border-b border-[--colors-cardBorder] px-4"></nav>
    </header>
  );
};

export default Header;
