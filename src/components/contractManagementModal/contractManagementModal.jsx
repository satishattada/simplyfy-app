import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import InputField from "../inputField/inputField";
import SelectField from "../selectField/selectField";
import "./styles.css";
import { useAtom } from "jotai";
import { contractDataAtom } from "../../atoms/contractAtoms";
import { nodeModuleNameResolver } from "typescript";
import selectOptions from '../../data/dropDown';

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
    milestoneAmount: [],
  });
  const [errors, setErrors] = useState({
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
  });
  const [contractData, setContractData] = useAtom(contractDataAtom);
  const [initialYearAdded, setInitialYearAdded] = useState(false);

  useEffect(() => {
    if (modalType === "edit" || modalType === "view") {
      setFormData({
        ...modalData,
        milestoneAmount: modalData.milestoneAmount || [],
      });
    } else if (modalType === "add" && !initialYearAdded) {
      addNewYear();
      setInitialYearAdded(true);
    }
  }, [modalType, modalData, initialYearAdded]);

  const handleChange = (e, name) => {
    const value = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    const error = validateField(name, value);
    setErrors({
      ...errors,
      [name]: error,
    });
  };
  const validateField = (name, value) => {
    let error = "";
     console.log("inside name...........",name);
     console.log("inside value..........",value);
    if (name === "contractName") {
      if (!value) {
        error = "Contract Name is required";
      } else if (value.length < 2) {
        error = "Contract Name must be at least 2 characters long";
      }
    } else if (name === "contractType") {
      if (!value) {
        error = "Contract Type is required";
      }
    } else if (name === "teamType") {
      if (!value) {
        error = "Team Type is required";
      }
    } else if (name === "referencePO") {
      if (!value) {
        error = "Reference PO is required";
      }
    } else if(name === 'bpSubPortfolio'){
      if (!value) {
        error = "BP sub portfolio is required";
      }
    }
    console.log("inside name is........", name);
    console.log("inside error........", error);
    return error;
  };
  const handleYearChange = (e, yearIndex, month) => {
    const value = e.target.value;
    setFormData((prevData) => {
      const updatedMilestoneAmount = [...prevData.milestoneAmount];
      updatedMilestoneAmount[yearIndex].month[month] = value;
      return { ...prevData, milestoneAmount: updatedMilestoneAmount };
    });
  };

  const handleYearValueChange = (e, yearIndex) => {
    const newYear = e.target.value;
    setFormData((prevData) => {
      const updatedMilestoneAmount = [...prevData.milestoneAmount];
      updatedMilestoneAmount[yearIndex].year = newYear;
      return { ...prevData, milestoneAmount: updatedMilestoneAmount };
    });
  };


  const addNewYear = () => {
    const existingYears = formData.milestoneAmount.map((milestone) => milestone.year);
    if (existingYears.includes("")) {
      alert("Please fill in the existing year before adding a new one.");
      return;
    }
    setFormData((prevData) => ({
      ...prevData,
      milestoneAmount: [
        ...prevData.milestoneAmount,
        {
          year: "",
          month: {
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
      ],
    }));
  };

  const deleteYear = (yearIndex) => {
    setFormData((prevData) => {
      const updatedMilestoneAmount = [...prevData.milestoneAmount];
      updatedMilestoneAmount.splice(yearIndex, 1);
      return { ...prevData, milestoneAmount: updatedMilestoneAmount };
    });
  };

  const onSaveChanges = () => {
    const cleanedMilestoneAmount = formData.milestoneAmount.filter(
      (milestone) => milestone.year !== "" && Object.values(milestone.month).some((value) => value !== "")
    );

    const updatedFormData = { ...formData, milestoneAmount: cleanedMilestoneAmount };

    if (modalType === "edit") {
      const updatedContractData = contractData.map((item) =>
        item.id === updatedFormData.id ? updatedFormData : item
      );
      setContractData(updatedContractData);
    } else {
      setContractData([...contractData, updatedFormData]);
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
      milestoneAmount: [],
    });
    setInitialYearAdded(false);
    onClose();
  };

  const bpReportingFields = [
    {
      label: "BP Sub Portfolio",
      name: "bpSubPortfolio",
      fieldType: "dropdown",
    },
    { label: "Contract Name", name: "contractName", fieldType: "text" },
    { label: "Contract Type", name: "contractType", fieldType: "dropdown" },
    {
      label: "Discount Percentage",
      name: "discountPercentage",
      fieldType: "text",
    },
    { label: "Team Type", name: "teamType", fieldType: "dropdown" },
    {
      label: "Contract Currency",
      name: "contractCurrency",
      fieldType: "dropdown",
    },
    { label: "Contract FGID", name: "contractFGID", fieldType: "text" },
    { label: "Reference PO", name: "referencePO", fieldType: "text" },
    { label: "PO Revision", name: "PORevision", fieldType: "dropdown" },
  ];

  const contractsTrackerFields = [
    {
      label: "BP Sub Portfolio",
      name: "bpSubPortfolio",
      fieldType: "dropdown",
    },
    {
      label: "Contract Program (Mission / Program)",
      name: "contractProgram",
      fieldType: "dropdown",
    },
    { label: "Contract CSG", name: "contractCSG", fieldType: "text" },
    { label: "Revenue Type", name: "revenueType", fieldType: "dropdown" },
    { label: "Contract Name", name: "contractName", fieldType: "text" },
    { label: "Contract FGID", name: "contractFGID", fieldType: "text" },
    {
      label: "Contract Start Date",
      name: "contractStartDate",
      fieldType: "text",
    },
    { label: "Contract End Date", name: "contractEndDate", fieldType: "text" },
    {
      label: "Contract Currency",
      name: "contractCurrency",
      fieldType: "dropdown",
    },
    { label: "Reference PO", name: "referencePO", fieldType: "text" },
    { label: "PO Amount OMS", name: "POAmountOMS", fieldType: "text" },
    { label: "PO Amount FG", name: "POAmountFG", fieldType: "text" },
    { label: "PO Amount Ariba", name: "POAmountAriba", fieldType: "text" },
    {
      label: "Master Project Code",
      name: "masterProjectCode",
      fieldType: "text",
    },
    {
      label: "Master Project Code PM",
      name: "masterProjectCodePM",
      fieldType: "text",
    },
    { label: "Master PU", name: "masterPU", fieldType: "text" },
    { label: "LOE Number", name: "LOENumber", fieldType: "text" },
    { label: "Linked DPS Number", name: "linkedDPSNumber", fieldType: "text" },
    {
      label: "Infosys Contract Type",
      name: "infosysContractType",
      fieldType: "dropdown",
    },
    { label: "Total SoW Workers", name: "totalSoWWorkers", fieldType: "text" },
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
                      <span>
                        {field.fieldType === "text" ? (
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
                        ) : (
                          <div className="inputSelectField" key={field.name}>
                            <SelectField
                              label={field.label}
                              value={formData[field.name]}
                              onChange={(e) => handleChange(e, field.name)}
                              options={selectOptions[field.name] || []}
                              readOnly={modalType === "view"}
                            />
                          </div>
                        )}
                        {errors[field.name] && (
                          <span
                            style={{
                              color: "red",
                              marginLeft: "13px",
                              display: "block",
                            }}
                          >
                            {errors[field.name]}
                          </span>
                        )}
                      </span>
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
                    {formData.milestoneAmount.map((milestone, index) => (
                      <div className="milestone-section" key={index}>
                        <div className="milestone-header">
                          <InputField
                            label="Year"
                            type="text"
                            name={`year-${index}`}
                            value={milestone.year}
                            onChange={(e) => handleYearValueChange(e, index)}
                            readOnly={modalType === "view"}
                          />
                          {modalType !== "view" && index !== 0 && (
                            <button onClick={() => deleteYear(index)} disabled={formData.milestoneAmount.length === 1}>
                              Delete
                            </button>
                          )}
                        </div>
                        <div className="milestone-months">
                          {Object.keys(milestone.month).map((month) => (
                            <div className="milestone-month" key={month}>
                              <InputField
                                label={month}
                                type="text"
                                name={`${index}-${month}`}
                                value={milestone.month[month]}
                                onChange={(e) => handleYearChange(e, index, month)}
                                readOnly={modalType === "view"}
                              />
                            </div>
                          ))}
                        </div>
                        {modalType !== "view" && index === formData.milestoneAmount.length - 1 && (
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
                      <>
                        {field.fieldType === "text" ? (
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
                        ) : (
                          <div className="inputSelectField" key={field.name}>
                            <SelectField
                              label={field.label}
                              value={formData[field.name]}
                              onChange={(e) =>
                                handleChange(e, field.name)
                              }
                              options={selectOptions[field.name] || []}
                              readOnly={modalType === "view"}
                            />
                          </div>
                        )}
                      </>
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