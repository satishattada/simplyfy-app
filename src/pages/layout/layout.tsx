import { Outlet } from "react-router-dom";
import { withParamsAndNavigate } from "../../routes/with-params-navigate";

import { useState, useEffect } from "react";

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
    <div className="layout-container">
      <div className="page-container">
        <Outlet />
      </div>
    </div>
  );
};

export default withParamsAndNavigate(Layout);
export { Layout };
