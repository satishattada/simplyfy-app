import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import InputField from "../inputField/inputField";
import "./styles.css";
import { useAtom } from "jotai";
import { teamDataAtom } from "../../atoms/teamAtoms";

const AddTeamModal = ({ showModal, onClose, modalType, modalData = {} }) => {
  const [formData, setFormData] = useState({
    employeeNumber: "",
    resourceName: "",
    mission: "",
    project: "",
    l3Activity: "",
    location: "",
    pu: "",
    allocation: "",
    contractType: "",
    infosysRole: "",
    empBandCode: "",
    empType: "",
    projectCode: "",
    masterProjectCode: "",
    missionPMName: "",
    billableType: "",
    billabilityRemarks: "",
    primarySkill: "",
    secondarySkill: "",
    ntid: "",
    gpid: "",
    bpEmailId: "",
    empDU: "",
    empSubUnit: "",
    empUnit: "",
    empCompany: "",
    stpSEZ: "",
    baseCity: "",
    baseLocation: "",
    projectDMMailID: "",
    projectType: "",
    projectName: "",
    projectFromDate: "",
    projectToDate: "",
    serviceCode: "",
    projectBU: "",
    projectPU: "",
    projectSubUnit: "",
    projectUnit: "",
    projectCompany: "",
    allocFromDate: "",
    allocToDate: "",
    percent: "",
    onsiteOffshore: "",
    allocatedCountry: "",
    allocatedCity: "",
    reportingTo: "",
    isResourceLocatedAtBP: "",
    bpOfficeLocation: "",
  });

  const [teamData, setTeamData] = useAtom(teamDataAtom);

  useEffect(() => {
    if (modalType === "edit" || modalType === "view") {
      setFormData(modalData);
    }
  }, [modalType, modalData]);

  const handleChange = (e,name) => {
    const value = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const onSaveChanges = () => {
    if (modalType === "edit") {
      const updatedTeamData = teamData.map((item) =>
        item.employeeNumber === formData.employeeNumber ? formData : item
      );
      setTeamData(updatedTeamData);
    } else {
      setTeamData([...teamData, formData]);
    }
    handleCloseModal();
  };

  const handleCloseModal = () => {
    setFormData({
      employeeNumber: "",
      resourceName: "",
      mission: "",
      project: "",
      l3Activity: "",
      location: "",
      pu: "",
      allocation: "",
      contractType: "",
      infosysRole: "",
      empBandCode: "",
      empType: "",
      projectCode: "",
      masterProjectCode: "",
      missionPMName: "",
      billableType: "",
      billabilityRemarks: "",
      primarySkill: "",
      secondarySkill: "",
      ntid: "",
      gpid: "",
      bpEmailId: "",
      empDU: "",
      empSubUnit: "",
      empUnit: "",
      empCompany: "",
      stpSEZ: "",
      baseCity: "",
      baseLocation: "",
      projectDMMailID: "",
      projectType: "",
      projectName: "",
      projectFromDate: "",
      projectToDate: "",
      serviceCode: "",
      projectBU: "",
      projectPU: "",
      projectSubUnit: "",
      projectUnit: "",
      projectCompany: "",
      allocFromDate: "",
      allocToDate: "",
      percent: "",
      onsiteOffshore: "",
      allocatedCountry: "",
      allocatedCity: "",
      reportingTo: "",
      isResourceLocatedAtBP: "",
      bpOfficeLocation: "",
    });
    onClose();
  };

  const inputFields = [
    { label: "Employee Number", name: "employeeNumber" },
    { label: "Resource Name", name: "resourceName" },
    { label: "Mission", name: "mission" },
    { label: "Project", name: "project" },
    { label: "L3 Activity", name: "l3Activity" },
    { label: "Location", name: "location" },
    { label: "PU", name: "pu" },
    { label: "Allocation", name: "allocation" },
    { label: "Contract Type", name: "contractType" },
    { label: "Infosys Role", name: "infosysRole" },
    { label: "Emp Band Code", name: "empBandCode" },
    { label: "Emp Type", name: "empType" },
    { label: "Project Code", name: "projectCode" },
    { label: "Master Project Code", name: "masterProjectCode" },
    { label: "Mission PM Name", name: "missionPMName" },
    { label: "Billable Type", name: "billableType" },
    { label: "Billability Remarks", name: "billabilityRemarks" },
    { label: "Primary Skill", name: "primarySkill" },
    { label: "Secondary Skill", name: "secondarySkill" },
    { label: "NT ID", name: "ntid" },
    { label: "GP ID", name: "gpid" },
    { label: "BP Email ID", name: "bpEmailId" },
    { label: "Emp DU", name: "empDU" },
    { label: "Emp Sub Unit", name: "empSubUnit" },
    { label: "Emp Unit", name: "empUnit" },
    { label: "Emp Company", name: "empCompany" },
    { label: "STP/SEZ", name: "stpSEZ" },
    { label: "Base City", name: "baseCity" },
    { label: "Base Location", name: "baseLocation" },
    { label: "Project DM Mail ID", name: "projectDMMailID" },
    { label: "Project Type", name: "projectType" },
    { label: "Project Name", name: "projectName" },
    { label: "Project From Date", name: "projectFromDate" },
    { label: "Project To Date", name: "projectToDate" },
    { label: "Service Code", name: "serviceCode" },
    { label: "Project BU", name: "projectBU" },
    { label: "Project PU", name: "projectPU" },
    { label: "Project Sub Unit", name: "projectSubUnit" },
    { label: "Project Unit", name: "projectUnit" },
    { label: "Project Company", name: "projectCompany" },
    { label: "Alloc From Date", name: "allocFromDate" },
    { label: "Alloc To Date", name: "allocToDate" },
    { label: "Percent", name: "percent" },
    { label: "Onsite/Offshore", name: "onsiteOffshore" },
    { label: "Allocated Country", name: "allocatedCountry" },
    { label: "Allocated City", name: "allocatedCity" },
    { label: "Reporting To", name: "reportingTo" },
    { label: "Is Resource Located at BP", name: "isResourceLocatedAtBP" },
    { label: "BP Office Location", name: "bpOfficeLocation" },
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
            ? "Add Employee"
            : modalType === "edit"
            ? "Edit Employee"
            : "View Employee"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="modalContent">
          {inputFields.map((field) => (
            <div className="inputField" key={field.name}>
              <InputField
                label={field.label}
                type="text"
                name={field.name}
                value={formData[field.name]}
                onChange={(e) => handleChange(e, field.name)}
                readOnly={
                  modalType === "view" ||
                  (modalType === "edit" && field.name === "employeeNumber")
                }
              />
            </div>
          ))}
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
          <Button variant="primary" onClick={onSaveChanges}>
            Save Changes
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default AddTeamModal;
