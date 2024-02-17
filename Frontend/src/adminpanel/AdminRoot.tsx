import React from "react";
import { Outlet } from "react-router-dom";
type Props = {};

const Root = (props: Props) => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default Root;
