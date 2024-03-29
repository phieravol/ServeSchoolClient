import MainMenu from "@/components/headers/MainMenu";
import SideBar from "@/components/navbars/SideBar";
import React, { Suspense, lazy, useState } from "react";
import Loading from "./loading";
import MainFooter from "@/components/footers/MainFooter";

export default function Home() {
  return (
    <div id="container">
      <header id="header" className="border border-solid border-[#ccc]">
        <MainMenu />
      </header>

      <main id="main" className="flex flex-row justify-start gap-4">
        <nav id="nav-bar">
          <SideBar />
        </nav>
        <div id="main-content" className="w-full">
          <h1 className="text-[x-large] text-center font-medium p-4">
            This Is Home page
          </h1>
        </div>
      </main>

      <footer id="footer">
        <MainFooter />
      </footer>
    </div>
  );
}
