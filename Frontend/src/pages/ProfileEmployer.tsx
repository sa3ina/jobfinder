import React from "react";
import { useNavigate } from "react-router-dom";

type Props = {};

const ProfileEmployer = (props: Props) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    localStorage.removeItem("login");
    navigate("/");
    window.location.reload();
  };
  return (
    <>
      <div className="profilemployer">
        <p>ProfileJobSeeker</p>
        <button onClick={handleLogout}>logout</button>
      </div>
    </>
  );
};

export default ProfileEmployer;
