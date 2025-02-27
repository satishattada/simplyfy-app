import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import InputField from "../inputField/inputField";
import "./styles.css";
import { useAtom } from "jotai";
import { contractDataAtom } from "../../atoms/contractAtoms";

const ContractManagementModal = ({ showModal, onClose, modalType, modalData = {} }) => {
  const [formData, setFormData] = useState({
    bpSubPortfolio: "",
    contractName: "",
    contractType: "",
    discountPercentage: "",
    teamType: "",
    contractCurrency: "",
    contractFGID: "",
    referencePO: "",
    PORevision: "",
    contractProgram: "",
    contractCSG: "",
    revenueType: "",
    contractStartDate: "",
    contractEndDate: "",
    POAmountOMS: "",
    POAmountFG: "",
    POAmountAriba: "",
    masterProjectCode: "",
    masterProjectCodePM: "",
    masterPU: "",
    LOENumber: "",
    linkedDPSNumber: "",
    infosysContractType: "",
    totalSoWWorkers: "",
    years: {},
  });

  const [contractData, setContractData] = useAtom(contractDataAtom);

  useEffect(() => {
    if (modalType === "edit" || modalType === "view") {
      setFormData({
        ...modalData,
        years: modalData.years || {},
      });
    }
  }, [modalType, modalData]);

  const handleChange = (e, name) => {
    const value = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleYearChange = (e, year, month) => {
    const value = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      years: {
        ...prevData.years,
        [year]: {
          ...prevData.years[year],
          [month]: value,
        },
      },
    }));
  };

  const handleYearValueChange = (e, oldYear) => {
    const newYear = e.target.value;
    if (newYear in formData.years) {
      alert("Year already exists. Please enter a unique year.");
      return;
    }
    setFormData((prevData) => {
      const updatedYears = { ...prevData.years };
      updatedYears[newYear] = updatedYears[oldYear];
      delete updatedYears[oldYear];
      return { ...prevData, years: updatedYears };
    });
  };

  const addNewYear = () => {
    const newYear = "";
    setFormData((prevData) => ({
      ...prevData,
      years: {
        ...prevData.years,
        [newYear]: {
          jan: "",
          feb: "",
          mar: "",
          apr: "",
          may: "",
          jun: "",
          jul: "",
          aug: "",
          sep: "",
          oct: "",
          nov: "",
          dec: "",
        },
      },
    }));
  };

  const deleteYear = (year) => {
    setFormData((prevData) => {
      const updatedYears = { ...prevData.years };
      delete updatedYears[year];
      return { ...prevData, years: updatedYears };
    });
  };

  const onSaveChanges = () => {
    if (modalType === "edit") {
      const updatedTeamData = contractData.map((item) =>
        item.employeeNumber === formData.employeeNumber ? formData : item
      );
      setContractData(updatedTeamData);
    } else {
      setContractData([...contractData, formData]);
    }
    handleCloseModal();
  };

  const handleCloseModal = () => {
    setFormData({
      bpSubPortfolio: "",
      contractName: "",
      contractType: "",
      discountPercentage: "",
      teamType: "",
      contractCurrency: "",
      contractFGID: "",
      referencePO: "",
      PORevision: "",
      contractProgram: "",
      contractCSG: "",
      revenueType: "",
      contractStartDate: "",
      contractEndDate: "",
      POAmountOMS: "",
      POAmountFG: "",
      POAmountAriba: "",
      masterProjectCode: "",
      masterProjectCodePM: "",
      masterPU: "",
      LOENumber: "",
      linkedDPSNumber: "",
      infosysContractType: "",
      totalSoWWorkers: "",
      years: {},
    });
    onClose();
  };

  const bpReportingFields = [
    { label: "BP Sub Portfolio", name: "bpSubPortfolio" },
    { label: "Contract Name", name: "contractName" },
    { label: "Contract Type", name: "contractType" },
    { label: "Discount Percentage", name: "discountPercentage" },
    { label: "Team Type", name: "teamType" },
    { label: "Contract Currency", name: "contractCurrency" },
    { label: "Contract FGID", name: "contractFGID" },
    { label: "Reference PO", name: "referencePO" },
    { label: "PO Revision", name: "PORevision" },
  ];

  const contractsTrackerFields = [
    { label: "BP Sub Portfolio", name: "bpSubPortfolio" },
    { label: "Contract Program (Mission / Program)", name: "contractProgram" },
    { label: "Contract CSG", name: "contractCSG" },
    { label: "Revenue Type", name: "revenueType" },
    { label: "Contract Name", name: "contractName" },
    { label: "Contract FGID", name: "contractFGID" },
    { label: "Contract Start Date", name: "contractStartDate" },
    { label: "Contract End Date", name: "contractEndDate" },
    { label: "Contract Currency", name: "contractCurrency" },
    { label: "Reference PO", name: "referencePO" },
    { label: "PO Amount OMS", name: "POAmountOMS" },
    { label: "PO Amount FG", name: "POAmountFG" },
    { label: "PO Amount Ariba", name: "POAmountAriba" },
    { label: "Master Project Code", name: "masterProjectCode" },
    { label: "Master Project Code PM", name: "masterProjectCodePM" },
    { label: "Master PU", name: "masterPU" },
    { label: "LOE Number", name: "LOENumber" },
    { label: "Linked DPS Number", name: "linkedDPSNumber" },
    { label: "Infosys Contract Type", name: "infosysContractType" },
    { label: "Total SoW Workers", name: "totalSoWWorkers" },
  ];

  return (
    <Modal
      show={showModal}
      onHide={handleCloseModal}
      fullscreen={true}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>
          {modalType === "add"
            ? "Add Contract"
            : modalType === "edit"
            ? "Edit Contract"
            : "View Contract"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="modalContent">
          <div className="container mt-5">
            <div className="accordion" id="accordionExample">
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingOne">
                  <button
                    className="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseOne"
                    aria-expanded="true"
                    aria-controls="collapseOne"
                  >
                    <b>BP Reporting (MSB/CCN – quarterly)</b>
                  </button>
                </h2>
                <div
                  id="collapseOne"
                  className="accordion-collapse collapse show"
                  aria-labelledby="headingOne"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">
                    {bpReportingFields.map((field) => (
                      <div className="inputField" key={field.name}>
                        <InputField
                          label={field.label}
                          type="text"
                          name={field.name}
                          value={formData[field.name]}
                          onChange={(e) => handleChange(e, field.name)}
                          readOnly={modalType === "view"}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingThree">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseThree"
                    aria-expanded="false"
                    aria-controls="collapseThree"
                  >
                    <b>Milestone Amount</b>
                  </button>
                </h2>
                <div
                  id="collapseThree"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingThree"
                  data-bs-parent="#accordionExample"
                >
                  <div >
                    {Object.keys(formData.years).map((year, index) => (
                      <div className="milestone-section" key={year}>
                        <div className="milestone-header">
                          <InputField
                            label="Year"
                            type="text"
                            name={`year-${year}`}
                            value={year}
                            onChange={(e) => handleYearValueChange(e, year)}
                            readOnly={modalType === "view"}
                          />
                          {modalType !== "view" && (
                            <button onClick={() => deleteYear(year)} disabled={index === 0}>
                              Delete
                            </button>
                          )}
                        </div>
                        <div className="milestone-months">
                          {Object.keys(formData.years[year]).map((month) => (
                            <div className="milestone-month" key={month}>
                              <InputField
                                label={month}
                                type="text"
                                name={`${year}-${month}`}
                                value={formData.years[year][month]}
                                onChange={(e) => handleYearChange(e, year, month)}
                                readOnly={modalType === "view"}
                              />
                            </div>
                          ))}
                        </div>
                        {modalType !== "view" && index === Object.keys(formData.years).length - 1 && (
                          <Button className="add-year-button" variant="primary" onClick={addNewYear}>
                            Add New Year
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingTwo">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseTwo"
                    aria-expanded="false"
                    aria-controls="collapseTwo"
                  >
                    <b>Contracts Tracker (Infosys internal)</b>
                  </button>
                </h2>
                <div
                  id="collapseTwo"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingTwo"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">
                    {contractsTrackerFields.map((field) => (
                      <div className="inputField" key={field.name}>
                        <InputField
                          label={field.label}
                          type="text"
                          name={field.name}
                          value={formData[field.name]}
                          onChange={(e) => handleChange(e, field.name)}
                          readOnly={modalType === "view"}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          padding: "20px",
        }}
      >
        <Button variant="secondary" onClick={handleCloseModal}>
          Close
        </Button>
        {modalType !== "view" && (
          <Button
            style={{
              backgroundColor: "green",
            }}
            variant="primary"
            onClick={onSaveChanges}
          >
            Save Changes
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default ContractManagementModal;