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
import * as XLSX from 'xlsx';
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
          item.employeeNumber.includes(query) ||
          item.resourceName?.toLowerCase().includes(query?.toLowerCase()) ||
          item.mission?.toLowerCase().includes(query?.toLowerCase()) ||
          item.primarySkill
            ?.split(",")
            .some((skill: string) =>
              skill.trim().toLowerCase().includes(query?.toLowerCase())
            ) ||
          item.project?.toLowerCase().includes(query?.toLowerCase()) ||
          item.l3Activity?.toLowerCase().includes(query?.toLowerCase()) ||
          item.location?.toLowerCase().includes(query?.toLowerCase()) ||
          item.pu?.toLowerCase().includes(query?.toLowerCase()) ||
          item.allocation?.toLowerCase().includes(query?.toLowerCase()) ||
          item.contractType?.toLowerCase().includes(query?.toLowerCase()) ||
          item.infosysRole?.toLowerCase().includes(query?.toLowerCase())
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
  const handleBulkUpload = (event:any) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target && e.target.result) {
        const data = new Uint8Array(e.target.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        console.log(jsonData);
        const newData = jsonData.filter((newItem: any) => 
          !teamData.some((existingItem) => existingItem.employeeNumber === newItem.employeeNumber)
        );
        setTeamData((prevData) => [...prevData, ...(newData as TeamReq[])]);
      }
    };
    reader.readAsArrayBuffer(file);
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
        <div className="d-flex align-items-center">
          <i
            className="bi bi-plus-circle edit-btn mx-2"
            onClick={() => handleModal("add",{})}
          ></i>
          <CSVLink data={teamData} filename="employee-details.csv" target="_blank">
            <i className="bi bi-filetype-csv export-btn mx-2"></i>
          </CSVLink>
          <input
            type="file"
            accept=".xlsx, .xls"
            onChange={handleBulkUpload}
            style={{ display: "none" }}
            id="bulkUpload"
          />
          <label htmlFor="bulkUpload" className="mx-2">
            <i className="bi bi-upload edit-btn"></i>
          </label>
        </div>
      </div>
      <Table>
        <thead>
          <tr>
            <td>Employee Number</td>
            <td>Resource Name</td>
            <td>Location</td>
            <td>Mission</td>
            <td>Project</td>
            <td>L3 Activity</td>
            <td>Location</td>
            <td>PU</td>
            <td>Allocation</td>
            <td>Infosys Role</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {filteredData && filteredData?.length > 0 ? (
            filteredData?.map((request) => (
              <tr key={request.employeeNumber}>
                <td
                  style={{ color: "blue", textDecoration: "underline", cursor: "pointer" }}
                  onClick={() => handleModal("view", request)}
                >
                  {request.employeeNumber}
                </td>
                <td>{request.resourceName}</td>
                <td>{request.location}</td>
                <td>{request.mission}</td>
                <td>{request.project}</td>
                <td>{request.l3Activity}</td>
                <td>{request.location}</td>
                <td>{request.pu}</td>
                <td>{request.allocation}</td>
                <td>{request.infosysRole}</td>
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
