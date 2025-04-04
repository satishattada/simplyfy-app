import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import "./styles.css";
import DatePickerInput from "../datePicker/datePicker";
import { format } from "date-fns";

function DownloadContractModal({
  showDownloadModal,
  onClose,
  downloadFilterDateRangeData,
}) {
  const bpReportingFields = [
    {
      label: "Start Date",
      name: "filterStartDate",
      fieldType: "dropdown",
    },
    {
      label: "End Date",
      name: "filterEndDate",
      fieldType: "dropdown",
    },
  ];
  const [isCalendarOpen, setIsCalendarOpen] = useState(null);
  const [formData, setFormData] = useState({
    filterStartDate: "",
    filterEndDate: "",
  });
  const handleCalendarClick = (fieldName) => {
    setIsCalendarOpen(isCalendarOpen === fieldName ? null : fieldName); // Toggle visibility of calendar
  };
  const handleDateChange = (e, name) => {
    const value = e.target ? e.target.value : e;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value instanceof Date ? format(value, "dd-MMM-yy") : value,
    }));
    setIsCalendarOpen(null); // Close calendar once date is selected
  };
  const handleCloseModal = () => {
    onClose();
  };
  const onSaveChanges = () => {
    downloadFilterDateRangeData(formData);
    onClose();
  };
  return (
    <Modal
      show={showDownloadModal}
      onHide={handleCloseModal}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Filter Range</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          {bpReportingFields.map((field) => (
            <DatePickerInput
              key={field.name}
              field={field}
              formData={formData}
              isCalendarOpen={isCalendarOpen}
              handleCalendarClick={handleCalendarClick}
              handleDateChange={handleDateChange}
            />
          ))}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          style={{
            backgroundColor: "green",
          }}
          variant="primary"
          onClick={onSaveChanges}
        >
          OK
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
export default DownloadContractModal;
