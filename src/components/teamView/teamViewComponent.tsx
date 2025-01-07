import React, { useState, useEffect } from "react";
import "./styles.css";
import Table from "react-bootstrap/Table";
import { Form, InputGroup, Button } from "react-bootstrap";
import { FaSearch, FaTimes } from "react-icons/fa";
import SearchComponent from "../search/searchComponent";
interface Request {
  infyId: string;
  infyEmail: string;
  location: string;
  skills: string;
  PU: string;
  startDate: string;
  endDate: string;
  bpSponsorEmail: string;
  mission: string;
}
function TeamViewComponent() {
  const data: Request[] = [
    {
      infyId: "764576",
      infyEmail: "pallavi.bhadange@infosys.com",
      location: "Pune",
      skills: "React,Node,Angular",
      PU: "BP",
      startDate: "22-Dec-2023",
      endDate: "14-Aug-2022",
      bpSponsorEmail: "pallavi.bhadange@bp.com",
      mission: "Consumer",
    },
    {
        infyId: "23453",
        infyEmail: "adhavan.s_g@infosys.com",
        location: "Baglore",
        skills: "React,Node,Python",
        PU: "BP",
        startDate: "13-Jan-2024",
        endDate: "22-Sept-2025",
        bpSponsorEmail: "adhavan.s_g@bp.com",
        mission: "Consumer",
    },
    {
        infyId: "762345",
        infyEmail: "satish.attada@infosys.com",
        location: "London",
        skills: "React,Node,AWS",
        PU: "BP",
        startDate: "24-Aug-2023",
        endDate: "14-Dec-2025",
        bpSponsorEmail: "satish.attada@bp.com",
        mission: "Consumer",
    },
    {
        infyId: "764976",
        infyEmail: "pallavi.bhadange@infosys.com",
        location: "Pune",
        skills: "React,Node,Angular",
        PU: "BP",
        startDate: "22-Dec-2023",
        endDate: "14-Aug-2022",
        bpSponsorEmail: "pallavi.bhadange@bp.com",
        mission: "Consumer",
      },
      {
          infyId: "23543",
          infyEmail: "adhavan.s_g@infosys.com",
          location: "Bangalore",
          skills: "React,Node,Python,React,Node,Python",
          PU: "BP",
          startDate: "13-Jan-2024",
          endDate: "22-Sept-2025",
          bpSponsorEmail: "adhavan.s_g@bp.com",
          mission: "Consumer",
      },
      {
          infyId: "722345",
          infyEmail: "satish.attada@infosys.com",
          location: "London",
          skills: "React,Node,AWS",
          PU: "BP",
          startDate: "24-Aug-2023",
          endDate: "14-Dec-2025",
          bpSponsorEmail: "satish.attada@bp.com",
          mission: "Consumer",
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
          item.infyId.includes(query) ||
          item.infyEmail?.toLowerCase().includes(query?.toLowerCase()) ||
          item.location?.toLowerCase().includes(query?.toLowerCase()) ||
          item.skills?.toLowerCase().includes(query?.toLowerCase()) ||
          item.PU?.toLowerCase().includes(query?.toLowerCase()) ||
          item.startDate?.toLowerCase().includes(query?.toLowerCase()) ||
          item.endDate?.toLowerCase().includes(query?.toLowerCase()) ||
          item.bpSponsorEmail?.toLowerCase().includes(query?.toLowerCase()) ||
          item.mission?.toLowerCase().includes(query?.toLowerCase())
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
            <td>Infosys ID</td>
            <td>Infosys Email</td>
            <td>Location</td>
            <td>Skills</td>
            <td>PU</td>
            <td>Start Date</td>
            <td>End Date</td>
            <td>BP Sponsor Email</td>
            <td>Mission</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {filteredData.length > 0 ? (
            filteredData.map((request) => (
              <tr key={request.infyId}>
                <td>{request.infyId}</td>
                <td>{request.infyEmail}</td>
                <td>{request.location}</td>
                <td>{request.skills}</td>
                <td>{request.PU}</td>
                <td>{request.startDate}</td>
                <td>{request.endDate}</td>
                <td>{request.bpSponsorEmail}</td>
                <td>{request.mission}</td>
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

export default TeamViewComponent;
