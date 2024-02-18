import MainMenu from "@/components/headers/MainMenu";
import SideBar from "@/components/navbars/SideBar";
import React, { Suspense, lazy } from "react";
import Loading from "./loading";
import MainFooter from "../components/footers/MainFooter";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import CreateModal from "@/components/modals/CreateModal";

const TableBody = React.lazy(() => import('@/components/tables/TableBody'));

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
          <CreateModal />
          <h1 className="text-[x-large] text-center font-medium p-4">School Table Listing.</h1>
          <Suspense fallback={<Loading />}>
            <TableBody />
          </Suspense>
        </div>
      </main>

      <footer id="footer">
        <MainFooter />
      </footer>
    </div>

  );
}
