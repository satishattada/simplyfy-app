import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import InputField from "../inputField/inputField";
import SelectField from "../selectField/selectField";
import "./styles.css";
import { useAtom } from "jotai";
import { contractDataAtom } from "../../atoms/contractAtoms";
import { nodeModuleNameResolver } from "typescript";
import selectOptions from '../../data/dropDown';

const ContractManagementModal = ({
  showModal,
  onClose,
  modalType,
  modalData = {},
}) => {
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
    { label: "PO Revision", name: "PORevision", fieldType: "text" },
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
                  <div>
                    {modalType !== "view" && (
                      <Button
                        className="add-year-button"
                        variant="primary"
                        onClick={addNewYear}
                      >
                        Add New Year
                      </Button>
                    )}
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
                            <button
                              onClick={() => deleteYear(year)}
                              disabled={index === 0}
                            >
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
                                onChange={(e) =>
                                  handleYearChange(e, year, month)
                                }
                                readOnly={modalType === "view"}
                              />
                            </div>
                          ))}
                        </div>
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
                                setFormData({
                                  ...modalData,
                                  years: e.target.value,
                                })
                              }
                              options={[
                                {
                                  value: formData[field.name],
                                  label: formData[field.name],
                                },
                              ]}
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
