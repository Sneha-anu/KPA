import React from "react";
import { BrowserRouter } from "react-router-dom";

import Navbar from "./Component/navbar";
import { AppRouter } from "./Component/routerSwitch";
export default function CenteredGrid() {
  return (
    <BrowserRouter>
      <Navbar />
      <AppRouter />
    </BrowserRouter>
  );
}
