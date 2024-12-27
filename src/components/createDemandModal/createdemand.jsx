import React, { useState } from "react";
import "./styles.css";
import InputField from "../inputField/inputField";
import SelectField from "../selectField/selectField";
import DurationField from "../durationField/durationField";

export const AddDemandModal = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [productName, setProductName] = useState("");
  const [location, setLocation] = useState("");
  const [skills, setSkills] = useState("");
  const [role, setRole] = useState("");
  const [duration, setDuration] = useState("");
  const [durationType, setDurationType] = useState("months");
  const [status, setStatus] = useState("");
  const [proposedStartDate, setProposedStartDate] = useState("");
  const [dailyRate, setDailyRate] = useState("");
  const [candidateName, setCandidateName] = useState("");
  const [candidateEmpId, setCandidateEmpId] = useState("");
  const [candidateEmail, setCandidateEmail] = useState("");
  // const handleOpenModal = () => {
  //   setIsOpen(true);
  // };
  const handleCloseModal = () => {
    setIsOpen(false);
    setProductName("");
    setDuration("");
    setDurationType("months");
    setStatus("");
    setProposedStartDate("");
    setCandidateName("");
    setRole("");
    setLocation("");
    setCandidateEmpId("");
    setCandidateEmail("");
    setDailyRate("");
    setSkills("");
  };

  const handleSave = () => {
    handleCloseModal();
  };

  return (
    <div>
      {isOpen && (
        <div className="modalBox">
          <div className="modalContainer">
            <h2
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                marginBottom: "20px",
              }}
            >
              Add Demand
            </h2>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-between",
              }}
            >
              <div style={{ width: "32%", marginBottom: "20px" }}>
                <InputField
                  label="Product/App Name"
                  type="text"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                />
              </div>
              <div style={{ width: "32%", marginBottom: "20px" }}>
                <InputField
                  label="Location"
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
              <div style={{ width: "32%", marginBottom: "20px" }}>
                <InputField
                  label="Skills"
                  type="text"
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                />
              </div>
              <div style={{ width: "32%", marginBottom: "20px" }}>
                <InputField
                  label="Role"
                  type="text"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                />
              </div>
              <div style={{ width: "32%", marginBottom: "20px" }}>
                <DurationField
                  label="Duration"
                  duration={duration}
                  durationType={durationType}
                  onChangeDuration={(e) => setDuration(e.target.value)}
                  onChangeDurationType={(e) => setDurationType(e.target.value)}
                />
              </div>
              <div style={{ width: "32%", marginBottom: "20px" }}>
                <SelectField
                  label="Status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  options={[
                    { value: "Open", label: "Open" },
                    { value: "In Progress", label: "In Progress" },
                    { value: "Closed", label: "Closed" },
                  ]}
                />
              </div>
              <div style={{ width: "32%", marginBottom: "20px" }}>
                <InputField
                  label="Proposed Start Date"
                  type="date"
                  value={proposedStartDate}
                  onChange={(e) => setProposedStartDate(e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                />
              </div>
              <div style={{ width: "32%", marginBottom: "20px" }}>
                <InputField
                  label="Daily Rate (in $)"
                  type="text"
                  value={dailyRate}
                  onChange={(e) => setDailyRate(e.target.value)}
                />
              </div>
              <div style={{ width: "32%", marginBottom: "20px" }}>
                <InputField
                  label="Candidate Name"
                  type="text"
                  value={candidateName}
                  onChange={(e) => setCandidateName(e.target.value)}
                />
              </div>

              <div style={{ width: "48%", marginBottom: "20px" }}>
                <InputField
                  label="Candidate Infy Emp Id"
                  type="text"
                  value={candidateEmpId}
                  onChange={(e) => setCandidateEmpId(e.target.value)}
                />
              </div>
              <div style={{ width: "48%", marginBottom: "20px" }}>
                <InputField
                  label="Candidate Infy Email"
                  type="text"
                  value={candidateEmail}
                  onChange={(e) => setCandidateEmail(e.target.value)}
                />
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <button
                style={{
                  backgroundColor: "#4CAF50",
                  color: "#fff",
                  padding: "10px 20px",
                  borderRadius: "5px",
                  border: "none",
                  cursor: "pointer",
                }}
                onClick={handleSave}
              >
                Save
              </button>
              <button
                style={{
                  backgroundColor: "#ccc",
                  color: "#323",
                  marginLeft: "20px",
                  padding: "10px 20px",
                  borderRadius: "5px",
                  border: "none",
                  cursor: "pointer",
                }}
                onClick={handleCloseModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddDemandModal;
