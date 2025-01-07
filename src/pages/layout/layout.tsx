import { Outlet } from "react-router-dom";
import { withParamsAndNavigate } from "../../routes/with-params-navigate";

import { useState, useEffect } from "react";
import "./styles.css";
import HeaderComponent from "./headerComponent";
import Dashboard from "./dashboard/dashboard";
import { Container } from "react-bootstrap";

const Layout = (props: any) => {
 

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
  }, []);

  const navigate = () => {
    props.navigate("/login");
  };

  return (
    <>
      <HeaderComponent />
      <div className="d-flex justify-content-center mt-2 h5">Team Management</div>
      <Container fluid="md" className="page-container">
        <Outlet />
      </Container>
    </>
  );
};

export default withParamsAndNavigate(Layout);
export { Layout };
