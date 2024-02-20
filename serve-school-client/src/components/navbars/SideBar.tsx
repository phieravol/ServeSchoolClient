import { FC } from "react";

const SideBar: FC = (props) => {
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-center">
        <label
          htmlFor="my-drawer-2"
          className="btn btn-primary drawer-button lg:hidden"
        >
          Open drawer
        </label>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu p-4 w-64 min-h-full bg-base-200 text-base-content">
          {/* Sidebar content here */}
          <li>
            <a href="http://localhost:3000/schools">About Us</a>
          </li>
          <li>
            <a>Schools</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
