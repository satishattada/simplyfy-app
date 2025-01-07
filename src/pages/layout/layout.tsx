import { Outlet, useLocation } from "react-router-dom";
import { withParamsAndNavigate } from "../../routes/with-params-navigate";

import { useState, useEffect } from "react";
import "./styles.css";
import HeaderComponent from "./headerComponent";
import Dashboard from "./dashboard/dashboard";
import { Container } from "react-bootstrap";
import { RoutesEnum } from "../../enums/routeEnum";

const Layout = (props: any) => {
  const location = useLocation();

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
  }, []);

  const navigate = () => {
    props.navigate("/login");
  };
  const getCurrentPath = () => {
    switch (location.pathname) {
      case RoutesEnum.TEAM_MANAGEMENT:
        return 'Team Management';
      case RoutesEnum.FINANCE_MANAGEMENT:
        return 'Finance Management';
      case RoutesEnum.DASHBOARD:
        return 'Dashboard';
      case RoutesEnum.DEMAND_MANAGEMENT:
         return 'Demand Management'  
      default:
        return 'Dashboard';
    }
  };
  return (
    <>
      <HeaderComponent />
      <div className="d-flex justify-content-center mt-2 h5">{getCurrentPath()}</div>
      <Container fluid="md" className="page-container">
        <Outlet />
      </Container>
    </>
  );
};

export default withParamsAndNavigate(Layout);
export { Layout };
