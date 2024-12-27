import { Outlet } from "react-router-dom";
import { withParamsAndNavigate } from "../../routes/with-params-navigate";

import { useState, useEffect } from "react";
import "./styles.css";
import HeaderComponent from "./headerComponent";
import Dashboard from "./dashboard/dashboard";
import { Container } from "react-bootstrap";

const Layout = (props: any) => {
  // const {
  //   usersData,
  //   appAction } = props;
  // const [users, setUsers] = useState([]);

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // appAction.getUsers().then(() => {
    //   setUsers(usersData);
    // });
  }, []);

  const navigate = () => {
    props.navigate("/login");
  };

  return (
    <>
      <HeaderComponent />
      <Container fluid="md" className="page-container">
        <Outlet />
      </Container>
    </>
  );
};

export default withParamsAndNavigate(Layout);
export { Layout };
