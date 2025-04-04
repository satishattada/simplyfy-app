import React, { useState, useEffect } from "react";
import "./styles.css";
import Table from "react-bootstrap/Table";
import { Pagination, Spinner, Modal } from "react-bootstrap";
import { Form, InputGroup, Button } from "react-bootstrap";
import { FaSearch, FaTimes, FaFilter } from "react-icons/fa";
import contractsService from "../../services/contractsService";
import SearchComponent from "../search/searchComponent";
import { contractDataAtom, ContractReq } from "../../atoms/contractAtoms";
import { useAtom } from "jotai";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import ContractManagementModal from "../contractManagementModal/contractManagementModal";
import DownloadContractModal from "../downloadContractModal/downloadContractModal";
import FilterModal from "../filterModal/filterModal";
import transformContractData from "../../helper/helper";

function DemandView() {
  const itemsPerPage = 10;
  const [query, setQuery] = useState<string>("");
  const [totalItems, setTotalItems] = useState(0);
  const [filteredData, setFilteredData] = useState<ContractReq[] | undefined>(
    undefined
  );
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalType, setModalType] = useState<string>("add");
  const [modalData, setModalData] = useState<object>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [contractData, setContractData] = useAtom(contractDataAtom);
  const [loading, setLoading] = useState<boolean>(true);
  const [showDownloadModal, setShowDownloadModal] = useState<boolean>(false);
  const [showFilterModal, setShowFilterModal] = useState<boolean>(false);
  const [tableLoading, setTableLoading] = useState<boolean>(true); 
  const [uploadLoading, setUploadLoading] = useState<boolean>(false); 
  const [uploadMessage, setUploadMessage] = useState<string>("");

  const handleSearchChange = (query: string) => {
    setQuery(query);
  };

  useEffect(() => {
    handleFetchData();
  }, []);

  useEffect(() => {
    const searchTerms = query
      .split(/[\s,]+/)
      .map((term) => term.toLowerCase().trim())
      .filter(Boolean);
    if (query === "" || query === undefined) {
      const startIndex = (currentPage - 1) * itemsPerPage;
      const currentItems = contractData.slice(
        startIndex,
        startIndex + itemsPerPage
      );
      setFilteredData(currentItems); // Show all data if the search query is empty
      setTotalPages(Math.ceil(contractData.length / itemsPerPage));
    } else {
      // Filter data based on the query
      console.log("contractData", contractData);
      const filtered =
        contractData &&
        contractData?.filter((item: any) => {
          return searchTerms.some(
            (term) =>
              item.contractName?.toLowerCase().includes(term?.toLowerCase()) ||
              item.bpSubPortfolio
                ?.toLowerCase()
                .includes(term?.toLowerCase()) ||
              item.contractType?.toLowerCase().includes(term?.toLowerCase()) ||
              item.teamType?.toLowerCase().includes(term?.toLowerCase()) ||
              item.referencePO?.toString().includes(term?.toLowerCase()) ||
              item.contractCurrency
                ?.toLowerCase()
                .includes(term?.toLowerCase()) ||
              item.contractFGID?.toLowerCase().includes(term?.toLowerCase()) ||
              item.revenueType?.toLowerCase().includes(term?.toLowerCase())
          );
        });
      const startIndex = (currentPage - 1) * itemsPerPage;
      const currentItems = filtered.slice(
        startIndex,
        startIndex + itemsPerPage
      );
      setFilteredData(currentItems);
      setTotalPages(Math.ceil(filtered.length / itemsPerPage));
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
  const handleCloseDownloadModal = () => {
    setShowDownloadModal(false);
  };
  const handleFetchData = () => {
    setTableLoading(true);
    contractsService
      .getContractsData()
      .then((resp) => {
        const reponse = resp as ContractReq[];
        reponse.sort((a, b) => {
          const dateA: any = new Date(a.contractStartDate);
          const dateB: any = new Date(b.contractStartDate);
          return dateB - dateA;
        });
        setContractData(reponse);
        setTotalItems(reponse.length);
        setTotalPages(Math.ceil(reponse.length / itemsPerPage));
        setTableLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setTableLoading(false);
      });
  };

  const handleBulkUpload = async (event: any) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    setUploadLoading(true); 
    setUploadMessage("");
    reader.onload = async (e) => {
      if (e.target && e.target.result) {
        const data = new Uint8Array(e.target.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: "array", cellDates: true });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, {
          raw: false,
          dateNF: "dd-mmm-yy",
        });
        const transformedData = transformContractData(jsonData);
        console.log(transformedData);

        try {
          const response = await fetch(
            "https://operations-backend-production.up.railway.app/contract/bulk-add-edit",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(transformedData),
            }
          );

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(
              `Error: ${response.statusText} - ${errorData.message.join(", ")}`
            );
          }

          const result = await response.json();
          setUploadMessage("Contracts processed successfully!"); 
          handleFetchData(); 
        } catch (error) {
          console.error("Error uploading bulk data:", error);
          if (error instanceof Error) {
            setUploadMessage(`Bulk upload failed: ${error.message}`); 
          } else {
            setUploadMessage("Bulk upload failed: An unknown error occurred.");
          }
        } finally {
          setUploadLoading(false); 
        }
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const downloadExcel = () => {
    setShowDownloadModal(true);
  };
  const filterDateRange = (dateVal: any) => {
    const start = new Date(dateVal.filterStartDate); // Convert start date string to Date object
    const end = new Date(dateVal.filterEndDate); // Convert end date string to Date object

    return contractData.filter((contract) => {
      const contractStart = new Date(contract.contractStartDate); // Parse contract start date
      const contractEnd = new Date(contract.contractEndDate); // Parse contract end date

      // Check if contract falls within the given date range
      return contractStart >= start && contractEnd <= end;
    });
  };
  const downloadFilterDateRangeData = (dateVal: any) => {
    const data = filterDateRange(dateVal);
    const flattenedData = data.flatMap((item) => {
      return item.milestoneAmount.map((yearData: any) => {
    const flattenedData = contractData.flatMap((item) => {
      const { _id, __v, milestoneAmount, ...rest } = item; 
      return milestoneAmount.map((yearData: any) => {
        return {
          ...rest,
          year: yearData.year,
          PORevision:
            yearData.revision === 0
              ? "Original"
              : `Revision ${yearData.revision}`,
          ...yearData.month,
        };
      });
    });
    const ws = XLSX.utils.json_to_sheet(flattenedData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    const wbout = XLSX.write(wb, { bookType: "xls", type: "binary" });
    const blob = new Blob([s2ab(wbout)], { type: "application/octet-stream" });
    saveAs(blob, `contracts.xls`);
  };
  const s2ab = (s: string) => {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i < s.length; i++) {
      view[i] = s.charCodeAt(i) & 0xff;
    }
    return buf;
  };
  const handleCloseFilterModal = () => {
    setShowFilterModal(false);
  };
  const handleFilter = () => {
    setShowFilterModal(true);
  };
  const tempfun = (selectedFilter: any) => {
    return contractData.filter((contract) => {
      return Object.keys(selectedFilter).every((filterKey) => {
        const selectedItems =
          Array.isArray(selectedFilter[filterKey]) &&
          selectedFilter[filterKey].length > 0
            ? selectedFilter[filterKey].map(
                (item: any, index: any) => item[index]?.name
              )
            : null;
        console.log("selectedItems...................", selectedItems);
        if (!selectedItems) return true;
        return selectedItems.includes(contract[filterKey as keyof ContractReq]);
      });
    });
  };
  const filterSelectedData = (selectedFilter: any) => {
    console.log("selectedFilter", selectedFilter);
    const temp = tempfun(selectedFilter);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = temp.slice(startIndex, startIndex + itemsPerPage);

    console.log("temp.length", temp.length);
    setContractData(temp);
    setFilteredData(currentItems);
    setTotalPages(Math.ceil(temp.length / itemsPerPage));
    console.log("totalPages value is...........", totalPages);

    console.log("temp value is...........", currentItems);
  };
  return (
    <>
      {uploadLoading || uploadMessage ? (
        <Modal show centered>
          <Modal.Body>
            {uploadLoading ? (
              <div className="text-center">
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
                <p>Processing your upload, please wait...</p>
              </div>
            ) : (
              <p className="text-center">{uploadMessage}</p>
            )}
          </Modal.Body>
          {!uploadLoading && (
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setUploadMessage("")}>
                Close
              </Button>
            </Modal.Footer>
          )}
        </Modal>
      ) : null}
      <ContractManagementModal
        showModal={showModal}
        onClose={() => handleCloseModel()}
        modalType={modalType}
        modalData={
          modalType === "edit" || modalType === "view" ? modalData : undefined
        }
        onFetchData={() => handleFetchData()}
      />
      <DownloadContractModal
        showDownloadModal={showDownloadModal}
        onClose={() => handleCloseDownloadModal()}
        downloadFilterDateRangeData={(dateVal: any) =>
          downloadFilterDateRangeData(dateVal)
        }
      />
      <FilterModal
        showFilterModal={showFilterModal}
        onClose={() => handleCloseFilterModal()}
        filterSelectedData={(filterFormData: any) =>
          filterSelectedData(filterFormData)
        }
      />
      <div className="d-flex justify-content-between mt-5 mb-4">
        <div className="d-flex align-items-center">
          <SearchComponent onSearch={handleSearchChange} />
          <FaFilter onClick={handleFilter} />
        </div>
        <div className="d-flex align-items-center">
          <i
            className="bi bi-plus-circle edit-btn mx-2"
            onClick={() => handleModal("add", {})}
          ></i>
          <i
            className="bi bi-download edit-btn mx-2"
            onClick={downloadExcel}
          ></i>
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
      {tableLoading ? (
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">tableLoading...</span>
          </Spinner>
        </div>
      ) : (
        <>
          <Table>
            <thead>
              <tr>
                <td>Contract FGID</td>
                <td>Contract Name</td>
                <td>bp SubPortfolio</td>
                <td>Contract Type</td>
                <td>Team Type</td>
                <td>Reference PO</td>
                <td>Contract Currency</td>
                <td>Revenue Type</td>
                <td>Action</td>
              </tr>
            </thead>
            <tbody>
              {filteredData && filteredData.length > 0 ? (
                filteredData.map((request) => (
                  <tr key={request.id}>
                    <td
                      style={{
                        color: "blue",
                        textDecoration: "underline",
                        cursor: "pointer",
                      }}
                      onClick={() => handleModal("view", request)}
                    >
                      {request.contractFGID}
                    </td>
                    <td>{request.contractName}</td>
                    <td>{request.bpSubPortfolio}</td>
                    <td>{request.contractType}</td>
                    <td>{request.teamType}</td>
                    <td>{request.referencePO}</td>
                    <td>{request.contractCurrency}</td>
                    <td>{request.revenueType}</td>
                    <td>
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        className="rounded-btn"
                        onClick={() => handleModal("edit", request)}
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
              onClick={() =>
                handlePageChange(Math.min(currentPage + 1, totalPages))
              }
            />
          </Pagination>
        </>
      )}
    </>
  );
}

export default DemandView;
