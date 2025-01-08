import React, { useState, useEffect } from "react";
import "./styles.css";
import Table from "react-bootstrap/Table";
import { Form, InputGroup, Button } from "react-bootstrap";
import { FaSearch, FaTimes } from "react-icons/fa";
import SearchComponent from "../search/searchComponent";
interface Request {
  id: string;
  dateRequested: string;
  requestedBy: string;
  appName: string;
  location: string;
  skills: string;
  roll: string;
  duration: string;
  status: string;
}
function DemandView() {
  const data: Request[] = [
    {
      id: "1",
      dateRequested: "01-Dec-2024",
      requestedBy: "Chiranjeevi",
      appName: "App 1",
      location: "London",
      skills: "JavaScript",
      roll: "Developer",
      duration: "6 months",
      status: "Open",
    },
    {
      id: "2",
      dateRequested: "11-Dec-2024",
      requestedBy: "Rahim",
      appName: "App 2",
      location: "Pune",
      skills: "React, Node",
      roll: "Developer",
      duration: "3 months",
      status: "Open",
    },
    {
      id: "3",
      dateRequested: "20-Dec-2024",
      requestedBy: "Chiranjeevi",
      appName: "App 3",
      location: "Pune",
      skills: "Angular",
      roll: "Developer",
      duration: "9 months",
      status: "Closed",
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
          item.dateRequested.includes(query) ||
          item.requestedBy?.toLowerCase().includes(query?.toLowerCase()) ||
          item.skills?.split(",").some((skill) =>
            skill.trim().toLowerCase().includes(query?.toLowerCase())
          ) ||
          item.status?.toLowerCase().includes(query?.toLowerCase()) ||
          item.appName?.toLowerCase().includes(query?.toLowerCase()) ||
          item.location?.toLowerCase().includes(query?.toLowerCase()) ||
          item.roll?.toLowerCase().includes(query?.toLowerCase()) ||
          item.duration?.toLowerCase().includes(query?.toLowerCase()) ||
          item.status?.toLowerCase().includes(query?.toLowerCase())
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
            <td>Date Requested</td>
            <td>Requested By</td>
            <td>App Name</td>
            <td>Location</td>
            <td>Skills</td>
            <td>Roll</td>
            <td>Duration</td>
            <td>Status</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {filteredData.length > 0 ? (
            filteredData.map((request) => (
              <tr key={request.id}>
                <td>{request.id}</td>
                <td>{request.dateRequested}</td>
                <td>{request.requestedBy}</td>
                <td>{request.appName}</td>
                <td>{request.location}</td>
                <td>{request.skills}</td>
                <td>{request.roll}</td>
                <td>{request.duration}</td>
                <td>{request.status}</td>
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

export default DemandView;
