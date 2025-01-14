import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import InputField from "../inputField/inputField";
import SelectField from "../selectField/selectField";
import "./styles.css";
import { useAtom } from "jotai";
import { teamDataAtom } from "../../atoms/teamAtoms";
const AddTeamModal = ({ showModal, onClose }) => {
  const [productName, setProductName] = useState("");
  const [pu, setPU] = useState("");
  const [location, setLocation] = useState("");
  const [skills, setSkills] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [workType, setWorkType] = useState("");
  const [workScope, setWorkScope] = useState("");
  const [candidateEmpId, setCandidateEmpId] = useState("");
  const [candidateEmail, setCandidateEmail] = useState("");
  const [mission, setMission] = useState("");
  const [bpSponserEmail, setBpSponserEmail] = useState("");
  const [allocation, setAllocation] = useState("");
  const [contractType, setContractType] = useState("");
  const [rate, setRate] = useState("");
  const [backupResource, setBackupResource] = useState("");
const [teamData, setTeamData] = useAtom(teamDataAtom);
  const onSaveChanges =() =>{
    const newData ={
      infyId: candidateEmpId,
      infyEmail: candidateEmail,
      location: location,
      skills,
      PU: pu,
      startDate,
      endDate,
      bpSponsorEmail: bpSponserEmail,
      mission
    }
    console.log("teamData............",teamData);
    setTeamData([...teamData, newData]);
    onClose();
  }
  return (
    <Modal
      show={showModal}
      onHide={() => onClose()}
      fullscreen={true}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Add Team</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="modalContent">
          <div className="inputField">
            <InputField
              label="Infosys Id"
              type="text"
              value={candidateEmpId}
              onChange={(e) => setCandidateEmpId(e.target.value)}
            />
          </div>
          <div className="inputField">
            <InputField
              label="Infosys Email"
              type="text"
              value={candidateEmail}
              onChange={(e) => setCandidateEmail(e.target.value)}
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
              value={pu}
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
              value={bpSponserEmail}
              onChange={(e) => setBpSponserEmail(e.target.value)}
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
        <Button variant="secondary" onClick={() => onClose()}>
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
