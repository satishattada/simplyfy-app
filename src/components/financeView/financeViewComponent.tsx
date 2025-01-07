import React, { useState, useEffect } from "react";
import "./styles.css";
import Table from "react-bootstrap/Table";
import { Form, InputGroup, Button } from "react-bootstrap";
import { FaSearch, FaTimes } from "react-icons/fa";
import SearchComponent from "../search/searchComponent";
interface Request {
  id: string;  
  prodName: string;
  bpProdManager: string;
  bpTechLead: string;
  infyProjManager: string;
  state: string;
  mission: string;
  startDate: string,
  endDate: string;
  
}
function FinanceViewComponent() {
  const data: Request[] = [
    {
      id: "1",
        prodName: "MeinAral",
    bpProdManager: "Christoph Bach",
    bpTechLead: "Vikas Singh",
    infyProjManager: "Arunkumar Seetharaman",
    state: "ABC",
    mission: "Consumer",
    startDate: "22-Dec-2024",
    endDate: "14-Jan-2026",
    },
    {
        id: "2",
        prodName: "MeinAral",
    bpProdManager: "Christoph Bach",
    bpTechLead: "Vikas Singh",
    infyProjManager: "Arunkumar Seetharaman",
    state: "ABC",
    mission: "Consumer",
    startDate: "22-Dec-2024",
    endDate: "14-Jan-2026",
    },
    {
        id: "3",
        prodName: "MeinAral",
    bpProdManager: "Christoph Bach",
    bpTechLead: "Vikas Singh",
    infyProjManager: "Arunkumar Seetharaman",
    state: "ABC",
    mission: "Consumer",
    startDate: "22-Dec-2024",
    endDate: "14-Jan-2026",
    },
    {
        id: "4",
        prodName: "MeinAral",
    bpProdManager: "Christoph Bach",
    bpTechLead: "Vikas Singh",
    infyProjManager: "Arunkumar Seetharaman",
    state: "ABC",
    mission: "Consumer",
    startDate: "22-Dec-2024",
    endDate: "14-Jan-2026",
      },
      {
        id: "5",
        prodName: "MeinAral",
    bpProdManager: "Christoph Bach",
    bpTechLead: "Vikas Singh",
    infyProjManager: "Arunkumar Seetharaman",
    state: "ABC",
    mission: "Consumer",
    startDate: "22-Dec-2024",
    endDate: "14-Jan-2026",
      },
      {
        id: "6",
        prodName: "MeinAral",
    bpProdManager: "Christoph Bach",
    bpTechLead: "Vikas Singh",
    infyProjManager: "Arunkumar Seetharaman",
    state: "ABC",
    mission: "Consumer",
    startDate: "22-Dec-2024",
    endDate: "14-Jan-2026",
      },
  ];
  const [query, setQuery] = useState<string>("");
  const [filteredData, setFilteredData] = useState<Request[]>(data);
  const handleSearchChange = (query: string) => {
    setQuery(query);
    if (query === "" || query === undefined) {
      setFilteredData(data); // Show all data if the search query is empty
    } else {
      // Filter data based on the query
      const filtered = data.filter(
        (item) =>
          item.id.includes(query) ||
          item.prodName?.toLowerCase().includes(query?.toLowerCase()) ||
          item.bpProdManager?.toLowerCase().includes(query?.toLowerCase()) ||
          item.bpTechLead?.toLowerCase().includes(query?.toLowerCase()) ||
          item.infyProjManager?.toLowerCase().includes(query?.toLowerCase()) ||
          item.state?.toLowerCase().includes(query?.toLowerCase()) ||
          item.mission?.toLowerCase().includes(query?.toLowerCase()) ||
          item.startDate?.toLowerCase().includes(query?.toLowerCase()) ||
          item.endDate?.toLowerCase().includes(query?.toLowerCase())
      );
      setFilteredData(filtered); 
    }
  };

  return (
    <>
    <div className="d-flex justify-content-between mt-5 mb-4">
      <SearchComponent onSearch={handleSearchChange} />
      <i className="bi bi-plus-circle edit-btn"></i>
      </div>  
      <Table>
        <thead>
          <tr>
            <td>ID</td>
            <td>Product Name</td>
            <td>bp Product Manager</td>
            <td>bp Tech Lead</td>
            <td>Infosys Project Manager</td>
            <td>State</td>
            <td>Mission</td>
            <td>Start Date</td>
            <td>End Date</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {filteredData.length > 0 ? (
            filteredData.map((request) => (
              <tr key={request.id}>
                <td>{request.id}</td>
                <td>{request.prodName}</td>
                <td>{request.bpProdManager}</td>
                <td>{request.bpTechLead}</td>
                <td>{request.infyProjManager}</td>
                <td>{request.state}</td>
                <td>{request.mission}</td>
                <td>{request.startDate}</td>
                <td>{request.endDate}</td>
                <td>
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    className="rounded-btn"
                  >
                    Edit
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={9} className="text-center">
                No matching data found
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </>
  );
}

export default FinanceViewComponent;
