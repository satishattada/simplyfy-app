import React, { useState, useEffect } from "react";
import "./styles.css";
import Table from "react-bootstrap/Table";
import { Pagination } from 'react-bootstrap';
import { Form, InputGroup, Button } from "react-bootstrap";
import { FaSearch, FaTimes } from "react-icons/fa";
import contractsService from "../../services/contractsService";
import SearchComponent from "../search/searchComponent";
import { contractDataAtom, ContractReq } from "../../atoms/contractAtoms";
import { useAtom } from "jotai";
import { CSVLink } from 'react-csv';
import * as XLSX from 'xlsx';
import ContractManagementModal from "../contractManagementModal/contractManagementModal";
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
  const itemsPerPage = 5;
  const [query, setQuery] = useState<string>("");
  const [totalItems, setTotalItems] = useState(0);
  const [filteredData, setFilteredData] = useState<ContractReq[] | undefined>(
      undefined
    );
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalType, setModalType] = useState<string>("add");
  const [modalData, setModalData] = useState<object>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [contractData, setTeamData] = useAtom(contractDataAtom);
  const handleSearchChange = (query: string) => {
    setQuery(query);
  };

  useEffect(() => {
    contractsService
      .getContractsData()
      .then((resp) => {
        const reponse = resp as ContractReq[];
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
        const currentItems = contractData.slice(startIndex, startIndex + itemsPerPage);
        setFilteredData(currentItems); // Show all data if the search query is empty
      } else {
        // Filter data based on the query
        const filtered = contractData && contractData?.filter(
          (item: any) =>
            item.id.includes(query) ||
            item.contractName?.toLowerCase().includes(query?.toLowerCase()) ||
            item.bpSubPortfolio?.toLowerCase().includes(query?.toLowerCase()) ||
            item.contractType?.toLowerCase().includes(query?.toLowerCase()) ||
            item.teamType?.toLowerCase().includes(query?.toLowerCase()) ||
            item.referencePO?.toLowerCase().includes(query?.toLowerCase()) ||
            item.PORevision?.toLowerCase().includes(query?.toLowerCase()) ||
            item.contractCurrency?.toLowerCase().includes(query?.toLowerCase()) ||
            item.contractFGID?.toLowerCase().includes(query?.toLowerCase()) ||
            item.revenueType?.toLowerCase().includes(query?.toLowerCase())
          );
       // setTotalItems(Math.ceil(filtered.length / itemsPerPage));
        const startIndex = (currentPage - 1) * itemsPerPage;
        const currentItems = filtered.slice(startIndex, startIndex + itemsPerPage);
        console.log("inside currentItems...........",currentItems);
        setFilteredData(currentItems);
      }
    }, [contractData, query, currentPage]);
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
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  const handleCloseModel = () => {
    setShowModal(false);
    setModalData({});
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
            !contractData.some((existingItem) => existingItem.id === newItem.id)
          );
          setTeamData((prevData) => [...prevData, ...(newData as ContractReq[])]);
        }
      };
      reader.readAsArrayBuffer(file);
    };
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  return (
    <>
    <ContractManagementModal
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
                <CSVLink data={contractData} filename="employee-details.csv" target="_blank">
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
            {/* <td>ID</td> */}
            <td>Contract Name</td>
            <td>bp SubPortfolio</td>
            <td>Contract Type</td>
            <td>Team Type</td>
            <td>Reference PO</td>
            <td>PO Revision</td>
            <td>Contract Currency</td>
            <td>Contract FGID</td>
            <td>Revenue Type</td>
          </tr>
        </thead>
        <tbody>
          {filteredData && filteredData.length > 0 ? (
            filteredData.map((request) => (
              <tr key={request.id}>
                <td
                  style={{ color: "blue", textDecoration: "underline", cursor: "pointer" }}
                  onClick={() => handleModal("view", request)}
                >
                  {request.contractName}
                </td>
                {/* <td>{request.id}</td> */}
                <td>{request.bpSubPortfolio}</td>
                <td>{request.contractType}</td>
                <td>{request.teamType}</td>
                <td>{request.referencePO}</td>
                <td>{request.PORevision}</td>
                <td>{request.contractCurrency}</td>
                <td>{request.contractFGID}</td>
                <td>{request.revenueType}</td>
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

export default DemandView;
