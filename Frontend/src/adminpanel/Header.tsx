//@ts-nocheck
import {
  BsFillBellFill,
  BsFillEnvelopeFill,
  BsPersonCircle,
  BsJustify,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";

function Header({ OpenSidebar }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    localStorage.removeItem("login");
    navigate("/");
    window.location.reload();
  };
  return (
    <header className="header">
      <div className="menu-icon">
        <BsJustify className="icon" onClick={OpenSidebar} />
      </div>
      <div className="header-left"></div>
      <div className="header-right">
        <BsFillBellFill className="icon" />
        <BsFillEnvelopeFill className="icon" />
        <BsPersonCircle className="icon" />
        <button onClick={handleLogout} className="logout">
          logout
        </button>
      </div>
    </header>
  );
}

export default Header;
