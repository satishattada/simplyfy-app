import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import InputField from "../inputField/inputField";
import SelectField from "../selectField/selectField";
import "./styles.css";
import { useAtom } from "jotai";
import { teamDataAtom } from "../../atoms/teamAtoms";

const AddTeamModal = ({
  showModal,
  onClose,
  modalType,
  modalData = {},
}) => {
  const [infyId, setInfyId] = useState("");
  const [infyEmail, setInfyEmail] = useState("");
  const [location, setLocation] = useState("");
  const [skills, setSkills] = useState("");
  const [PU, setPU] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [bpSponsorEmail, setBpSponsorEmail] = useState("");
  const [mission, setMission] = useState("");
  const [productName, setProductName] = useState("");
  const [workType, setWorkType] = useState("");
  const [workScope, setWorkScope] = useState("");
  const [allocation, setAllocation] = useState("");
  const [contractType, setContractType] = useState("");
  const [rate, setRate] = useState("");
  const [backupResource, setBackupResource] = useState("");
  const [teamData, setTeamData] = useAtom(teamDataAtom);

  useEffect(() => {
    if (modalType === "edit" || modalType === "view") {
      setInfyId(modalData.infyId);
      setInfyEmail(modalData.infyEmail);
      setLocation(modalData.location);
      setSkills(modalData.skills);
      setPU(modalData.PU);
      setStartDate(modalData.startDate);
      setEndDate(modalData.endDate);
      setBpSponsorEmail(modalData.bpSponsorEmail);
      setMission(modalData.mission);
      setProductName(modalData.productName);
      setWorkType(modalData.workType);
      setWorkScope(modalData.workScope);
      setAllocation(modalData.allocation);
      setContractType(modalData.contractType);
      setRate(modalData.rate);
      setBackupResource(modalData.backupResource);
    }
  }, [modalType, modalData]);

  const onSaveChanges = () => {
    const newData = {
      infyId: infyId,
      infyEmail: infyEmail,
      location: location,
      skills,
      PU: PU,
      startDate,
      endDate,
      bpSponsorEmail: bpSponsorEmail,
      mission,
      productName,
      workType,
      workScope,
      allocation,
      contractType,
      rate,
      backupResource,
    };
    console.log("teamData............", teamData, newData);
    if (modalType === "edit") {
      const updatedTeamData = teamData.map((item) =>
        item.infyId === infyId ? newData : item
      );
      setTeamData(updatedTeamData);
    } else {
      setTeamData([...teamData, newData]);
    }
    handleCloseModal();
  };

  const handleCloseModal = () => {
    setInfyId("");
    setInfyEmail("");
    setLocation("");
    setSkills("");
    setPU("");
    setStartDate("");
    setEndDate("");
    setBpSponsorEmail("");
    setMission("");
    setProductName("");
    setWorkType("");
    setWorkScope("");
    setAllocation("");
    setContractType("");
    setRate("");
    setBackupResource("");
    onClose();
  };

  return (
    <Modal
      show={showModal}
      onHide={() => handleCloseModal()}
      fullscreen={true}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>{modalType === "edit" ? "Edit Employee" : "Add Employee"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="modalContent">
          <div className="inputField">
            <InputField
              label="Infosys Id"
              type="text"
              value={infyId}
              onChange={(e) => setInfyId(e.target.value)}
            />
          </div>
          <div className="inputField">
            <InputField
              label="Infosys Email"
              type="text"
              value={infyEmail}
              onChange={(e) => setInfyEmail(e.target.value)}
            />
          </div>
          <div className="inputField">
            <InputField
              label="Location"
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <div className="inputField">
            <InputField
              label="Skills"
              type="text"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
            />
          </div>
          <div className="inputField">
            <InputField
              label="PU"
              type="text"
              value={PU}
              onChange={(e) => setPU(e.target.value)}
            />
          </div>
          <div className="inputField">
            <InputField
              label="Start Date"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              //   min={new Date().toISOString().split("T")[0]}
            />
          </div>
          <div className="inputField">
            <InputField
              label="End Date"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              //   min={new Date().toISOString().split("T")[0]}
            />
          </div>
          <div className="inputField">
            <SelectField
              label="Work Type"
              value={workType}
              onChange={(e) => setWorkType(e.target.value)}
              options={[
                { value: "CAPEX", label: "CAPEX" },
                { value: "OPEX", label: "OPEX" },
              ]}
            />
          </div>
          <div className="inputField">
            <SelectField
              label="Work Scope"
              value={workScope}
              onChange={(e) => setWorkScope(e.target.value)}
              options={[
                { value: "DevOps", label: "DevOps" },
                { value: "OpsDev", label: "OpsDev" },
                { value: "Dev", label: "Dev" },
                { value: "KTLO", label: "KTLO" },
              ]}
            />
          </div>
          <div className="inputField">
            <InputField
              label="Product/App Name"
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
          </div>
          <div className="inputField">
            <InputField
              label="Mission"
              type="text"
              value={mission}
              onChange={(e) => setMission(e.target.value)}
            />
          </div>
          <div className="inputField">
            <InputField
              label="bp Sponsor Email"
              type="text"
              value={bpSponsorEmail}
              onChange={(e) => setBpSponsorEmail(e.target.value)}
            />
          </div>
          <div className="inputField">
            <InputField
              label="Allocation %"
              type="text"
              value={allocation}
              onChange={(e) => setAllocation(e.target.value)}
            />
          </div>
          <div className="inputField">
            <InputField
              label="Contract Type"
              type="text"
              value={contractType}
              onChange={(e) => setContractType(e.target.value)}
            />
          </div>
          <div className="inputField">
            <InputField
              label="Rate"
              type="text"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
            />
          </div>
          <div className="inputField">
            <InputField
              label="Backup Resource"
              type="text"
              value={backupResource}
              onChange={(e) => setBackupResource(e.target.value)}
            />
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
        <Button variant="secondary" onClick={() => handleCloseModal()}>
          Close
        </Button>
        <Button variant="primary" onClick={() => onSaveChanges()}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddTeamModal;
