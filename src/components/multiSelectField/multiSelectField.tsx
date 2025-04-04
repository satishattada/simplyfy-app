import React, { ReactNode } from "react";
import "./styles.css";
import Multiselect from "multiselect-react-dropdown";

interface MultiSelectFieldProps {
  selectOptions: Record<string, { label: string; value: string }[]>;
  field: {
    label: ReactNode;
    name: string;
  };
  selectedItems: { name: string }[];
  onSelect: (
    selectedList: { name: string }[],
    selectedItem: { id: string }
  ) => void;
  onRemove: (
    selectedList: { name: string }[],
    removedItem: { name: string }
  ) => void;
}

const MultiSelectField: React.FC<MultiSelectFieldProps> = ({
  selectOptions,
  field,
  selectedItems,
  onSelect,
  onRemove,
}) => {
  const transformedOptions = selectOptions[field.name].map((option) => ({
    name: option.label, // Display name
    id: field.name, // Unique identifier
  }));
  return (
    <div className="inputSelectField" key={field.name}>
      <span>{field.label}</span>
      <Multiselect
        options={transformedOptions || []} // List of options to display
        selectedValues={selectedItems} // The selected values
        onSelect={onSelect} // Function called when items are selected
        onRemove={onRemove} // Function called when items are removed
        displayValue="name" // The key of the object that will be displayed
        showCheckbox={true} // Display checkboxes for selection
        placeholder="Select Options"
      />
    </div>
  );
};

export default MultiSelectField;
