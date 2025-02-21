import React from "react";
import "./Header.css";
import Image from "next/image";

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="header-logo">
          <Image
            src="/favicon.ico"
            alt="GaryAI Logo"
            width={24}
            height={24}
            className="mr-2 inline-block"
          />
          <a
            className="header-label"
            href="https://github.com/gary-zhou-98?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
          >
            Gary-Zhou-98
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
