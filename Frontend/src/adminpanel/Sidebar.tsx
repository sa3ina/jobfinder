import React from "react";
import {
  BsCart3,
  BsGrid1X2Fill,
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
  BsListCheck,
  BsMenuButtonWideFill,
  BsFillGearFill,
} from "react-icons/bs";
import { Link } from "react-router-dom";
function Sidebar({ openSidebarToggle, OpenSidebar }) {
  return (
    <aside
      id="sidebar"
      className={openSidebarToggle ? "sidebar-responsive" : ""}
    >
      <div className="sidebar-title">
        <div className="sidebar-brand">ADMIN PANEL</div>
        <span className="icon close_icon" onClick={OpenSidebar}>
          X
        </span>
      </div>

      <ul className="sidebar-list">
        <Link to="/admin" className="link">
          <li className="sidebar-list-item">
            <a href="/admin">
              <BsGrid1X2Fill className="icon" /> Dashboard
            </a>
          </li>
        </Link>
        <Link to="/adminjobs" className="link">
          <li className="sidebar-list-item">
            <a href="/adminjobs">
              <BsFillArchiveFill className="icon" /> Jobs
            </a>
          </li>
        </Link>

        <li className="sidebar-list-item">
          <a href="">
            <BsFillGrid3X3GapFill className="icon" /> Categories
          </a>
        </li>
        <Link to="/adminjs" className="link">
          <li className="sidebar-list-item">
            <a href="/adminjs">
              <BsPeopleFill className="icon" /> Jobseekers
            </a>
          </li>
        </Link>
        <Link to="/adminemp" className="link">
          <li className="sidebar-list-item">
            <a href="/adminemp">
              <BsListCheck className="icon" /> Employers
            </a>
          </li>
        </Link>
        <li className="sidebar-list-item">
          <a href="">
            <BsMenuButtonWideFill className="icon" /> Reports
          </a>
        </li>
        <li className="sidebar-list-item">
          <a href="">
            <BsFillGearFill className="icon" /> Setting
          </a>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
