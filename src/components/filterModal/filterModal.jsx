import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import "./styles.css";
import { format } from "date-fns";
import selectOptions from "../../data/dropDown";
import bpReportingFields from "../../data/reportingField";
import SelectField from "../selectField/selectField";
import MultiSelectField from "../multiSelectField/multiSelectField";

function FilterModal({ showFilterModal, onClose, filterSelectedData }) {
  const [filterFormData, setFilterFormData] = useState({
    bpSubPortfolio: [],
    contractType: [],
    teamType: [],
    contractCurrency: [],
    revenueType: [],
    infosysContractType: [],
    contractProgram: [],
  });
  const options = [
    { name: "Apple", id: 1 },
    { name: "Banana", id: 2 },
    { name: "Cherry", id: 3 },
    { name: "Date", id: 4 },
    { name: "Grapes", id: 5 },
  ];

  const [selectedItems, setSelectedItems] = useState([]);

  const handleSelect = (selectedList) => {
    console.log("inside selectedList", selectedList);
    setSelectedItems(selectedList);
    setFilterFormData((prevData) => {
      console.log("inside prevData", prevData);
      const currentSelectedItems = prevData[selectedList.id] || []; // Default to empty array if undefined
      const updatedSelectedItems = [...currentSelectedItems, selectedList];
      console.log("inside updatedSelectedItems", updatedSelectedItems);
      return {
        ...prevData,
        [selectedList[0].id]: updatedSelectedItems,
      };
    });

    console.log("inside filterFormData.............", filterFormData);
  };

  const handleRemove = (removedList) => {
    setSelectedItems(removedList);
  };

  const handleCloseModal = () => {
    onClose();
  };
  const onSaveChanges = () => {
    console.log("inside filterFormData.............", filterFormData);
    filterSelectedData(filterFormData);
    onClose();
  };
  return (
    <Modal
      show={showFilterModal}
      onHide={handleCloseModal}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Filter Range</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="grid-container">
          {bpReportingFields.map(
            (field) =>
              field.fieldType === "dropdown" && (
                <MultiSelectField
                  selectOptions={selectOptions}
                  field={field}
                  onSelect={handleSelect} // Function called when items are selected
                  onRemove={handleRemove}
                />
              )
          )}
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
export default FilterModal;
