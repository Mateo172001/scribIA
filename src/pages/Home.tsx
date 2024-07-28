import React, { useEffect } from "react";
import {
  Tab,
  TabList,
  SelectTabEventHandler,
  SelectTabEvent,
  SelectTabData,
} from "@fluentui/react-components";
import ScribIALogo from "../assets/Logo";
import { BiDetail, BiEraser, BiEdit } from "react-icons/bi";
import { useNavigate, useLocation, Outlet } from "react-router-dom";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleTabSelect: SelectTabEventHandler = (
    event: SelectTabEvent,
    data: SelectTabData
  ) => {
    navigate(`/${data.value}`);
  };

  useEffect(() => {
    if (!location.pathname.substring(1)) {
      navigate("/resume");
    }
  }, [location.pathname, navigate]);

  return (
    <>
      <div className="m-auto w-1/3 max-w-32 mb-2">
        <ScribIALogo />
      </div>
      <TabList
        selectedValue={location.pathname.substring(1) || "resume"}
        onTabSelect={handleTabSelect}
      >
        <Tab value="resume" icon={<BiDetail />}>
          Resumir
        </Tab>
        <Tab value="fix" icon={<BiEraser />}>
          Corregir
        </Tab>
        <Tab value="compose" icon={<BiEdit />}>
          Componer
        </Tab>
      </TabList>
      <div className="max-w-screen-lg m-auto">
        <Outlet />
      </div>
    </>
  );
};

export default Home;
