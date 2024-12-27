import React, { useState, useEffect } from "react";
import "./styles.css";
import { withParamsAndNavigate } from "../../../routes/with-params-navigate";
import Table from "react-bootstrap/Table";
import { Form, InputGroup, Button } from "react-bootstrap";
import { FaSearch, FaTimes } from "react-icons/fa";
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
function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState<Request[]>([
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
  ]);

  const handleSearchChange = (e: any) => {
    setSearchQuery(e.target.value);
  };

  const filteredData = data.filter((item) => {
    const query = searchQuery.toLowerCase();
    return (
      item.dateRequested.includes(query) ||
      item.requestedBy.toLowerCase().includes(query) ||
      item.skills.toLowerCase().includes(query) ||
      item.status.toLowerCase().includes(query) ||
      item.appName.toLowerCase().includes(query) ||
      item.location.toLowerCase().includes(query) ||
      item.roll.toLowerCase().includes(query) ||
      item.duration.toLowerCase().includes(query) ||
      item.status.toLowerCase().includes(query)
    );
  });
  const handleClearSearch = () => {
    setSearchQuery(""); // Clears the input field
  };
  return (
    <>
      <div className="row mt-5 mb-4">
        <div className="col-md-5">
          <InputGroup>
            <Form.Control
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearchChange}
            />

            {searchQuery ? (
              <Button
                variant="outline-secondary"
                onClick={handleClearSearch}
                className="input-clear-btn btn-outline"
              >
                <FaTimes />
              </Button>
            ) : (
              <Button
                variant="outline-secondary"
                className="btn-outline"
                onClick={handleSearchChange}
              >
                <FaSearch />
              </Button>
            )}
          </InputGroup>
        </div>
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

export default withParamsAndNavigate(Dashboard);
