import React, { useState, useEffect } from "react";
import "./styles.css";
import Table from "react-bootstrap/Table";
import { Pagination } from 'react-bootstrap';
import { Button } from "react-bootstrap";
import SearchComponent from "../search/searchComponent";
import AddTeamModal from "../addTeamModal/addTeamModal";
import { withParamsAndNavigate } from "../../routes/with-params-navigate";
import teamService from "../../services/teamService";
import { teamDataAtom, TeamReq } from "../../atoms/teamAtoms";
import { useAtom } from "jotai";
import { CSVLink } from 'react-csv';
function TeamViewComponent() {
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [query, setQuery] = useState<string>("");
  const [filteredData, setFilteredData] = useState<TeamReq[] | undefined>(
    undefined
  );
  const [teamData, setTeamData] = useAtom(teamDataAtom);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalType, setModalType] = useState<string>("add");
  const [modalData, setModalData] = useState<object>({});

  useEffect(() => {
    teamService
      .getTeamData()
      .then((resp) => {
        const reponse = resp as TeamReq[];
        setTeamData(reponse)
        setTotalItems(reponse.length);
        
     }) //set item count
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    if (query === "" || query === undefined) {
      //setTotalItems(Math.ceil(teamData.length / itemsPerPage));
     // 
      const startIndex = (currentPage - 1) * itemsPerPage;
      const currentItems = teamData.slice(startIndex, startIndex + itemsPerPage);
      setFilteredData(currentItems); // Show all data if the search query is empty
    } else {
      // Filter data based on the query
      const filtered = teamData && teamData?.filter(
        (item: any) =>
          item.infyId.includes(query) ||
          item.infyEmail?.toLowerCase().includes(query?.toLowerCase()) ||
          item.location?.toLowerCase().includes(query?.toLowerCase()) ||
          item.skills
            ?.split(",")
            .some((skill: string) =>
              skill.trim().toLowerCase().includes(query?.toLowerCase())
            ) ||
          item.PU?.toLowerCase().includes(query?.toLowerCase()) ||
          item.startDate?.toLowerCase().includes(query?.toLowerCase()) ||
          item.endDate?.toLowerCase().includes(query?.toLowerCase()) ||
          item.bpSponsorEmail?.toLowerCase().includes(query?.toLowerCase()) ||
          item.mission?.toLowerCase().includes(query?.toLowerCase())
      );
     // setTotalItems(Math.ceil(filtered.length / itemsPerPage));
      const startIndex = (currentPage - 1) * itemsPerPage;
      const currentItems = filtered.slice(startIndex, startIndex + itemsPerPage);
      console.log("inside currentItems...........",currentItems);
      setFilteredData(currentItems);
    }
  }, [teamData, query, currentPage]);
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const handleSearchChange = (query: string) => {
    setQuery(query);
  };
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  
  const handleCloseModel = () => {
    setShowModal(false);
    setModalData({});
  };

  const handleModal = (type: string, request?: any) => {
    setShowModal(true);
    setModalType(type);
    switch (type) {
      case "add":
        setModalData({});
        break;
      case "edit":
      case "view":
        setModalData(request);
        break;
      default:
        setModalData({});
    }
  };


  return (
    <>
      <AddTeamModal
        showModal={showModal}
        onClose={() => handleCloseModel()}
        modalType={modalType}
        modalData={modalType === "edit" || modalType === "view"  ? modalData : undefined}
      />
      <div className="d-flex justify-content-between mt-5 mb-4">
        <SearchComponent onSearch={handleSearchChange} />
        <div>
        <i
          className="bi bi-plus-circle edit-btn"
          onClick={() => handleModal("add",{})}
        ></i>
        <CSVLink data={teamData}  filename="employee-details.csv" target="_blank">
         <i className="bi bi-filetype-csv export-btn"></i>
        </CSVLink>
       
       </div>
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
          {filteredData && filteredData?.length > 0 ? (
            filteredData?.map((request) => (
              <tr key={request.infyId}>
                <td
                  style={{ color: "blue", textDecoration: "underline", cursor: "pointer" }}
                  onClick={() => handleModal("view", request)}
                >
                  {request.infyId}
                </td>
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
                    onClick={() => handleModal("edit",request)}
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
      <Pagination>
        <Pagination.Prev
          onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
        />
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <Pagination.Item
            key={page}
            active={page === currentPage}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </Pagination.Item>
        ))}
        <Pagination.Next
          onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
        />
      </Pagination>
    </>
  );
}

export default withParamsAndNavigate(TeamViewComponent);
