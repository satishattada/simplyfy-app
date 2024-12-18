
import { BrowserRouter, Routes, Route, } from "react-router-dom";
import Layout from "../pages/layout/layout";
import Dashboard from "../pages/layout/dashboard/dashboard";
import NoPage from "../pages/noPage/noPage";
import Login from "../pages/login/login";
import DemandManagement from "../pages/layout/demandManagement/demandManagement";
import TeamManagement from "../pages/layout/teamManagement/teamManagement";
import FinanceManagement from "../pages/layout/financeManagement/financeManagement";


function RoutesContainer() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/demand-management" element={<DemandManagement />} />
          <Route path="/team-management" element={<TeamManagement />} />
          <Route path="/finance-management" element={<FinanceManagement />} />
        </Route>
        <Route path="*" element={<NoPage />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default RoutesContainer;

