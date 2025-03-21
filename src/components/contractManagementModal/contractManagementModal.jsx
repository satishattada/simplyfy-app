import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import InputField from "../inputField/inputField";
import SelectField from "../selectField/selectField";
import DatePickerInput from "../datePicker/datePicker";
import "./styles.css";
import { useAtom } from "jotai";
import { contractDataAtom } from "../../atoms/contractAtoms";
import { nodeModuleNameResolver } from "typescript";
import selectOptions from "../../data/dropDown";
import bpReportingFields from "../../data/reportingField";
import Table from "react-bootstrap/Table";
import { FaTrash } from "react-icons/fa";
import { format } from 'date-fns';
import contractsService from "../../services/contractsService";
const ContractManagementModal = ({
  showModal,
  onClose,
  modalType,
  modalData = {},
  onFetchData,
}) => {
  const [selectedRevision, setSelectedRevision] = useState(null);
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
  const years = [
    ...new Set(formData && formData?.milestoneAmount.map((item) => item.year)),
  ];
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedYearData, setSelectedYearData] = useState(null);
  const [isCalendarOpen, setIsCalendarOpen] = useState(null);
  useEffect(() => {
    const years = [
      ...new Set(
        formData?.milestoneAmount
          .filter((item) => item.year != null && item.year !== "") // Filter out null and empty string
          .map((item) => item.year)
      ),
    ];
    if (
      modalType !== "add" &&
      (selectedYear === null || selectedYear === undefined)
    ) {
      setSelectedYear(Number(years[0]));
    }
  }, [formData]);
  useEffect(() => {
    const filteredData =
      formData?.milestoneAmount &&
      formData?.milestoneAmount.filter((item) => item.year === selectedYear);
    const revisions = [
      ...new Set(
        formData?.milestoneAmount
          .filter((item) => item.revision != null && item.revision !== "") // Filter out null and empty string
          .map((item) => item.revision)
      ),
    ];
    setSelectedYearData(filteredData);
    setSelectedRevision(revisions);
    if (formData.contractStartDate !== "" && formData.contractEndDate !== "") {
      addYearsForStartAndEndDate();
    }
  }, [selectedYear, formData]);
  useEffect(() => {
    if (modalType === "edit" || modalType === "view") {
      setFormData({
        ...modalData,
        milestoneAmount: modalData.milestoneAmount || [],
      });
    } else if (modalType === "add" && !initialYearAdded) {
      addNewRevisionData();
      setInitialYearAdded(true);
    }
  }, [modalType, modalData, initialYearAdded]);
  const handleTabClick = (year) => {
    setSelectedYear(Number(year));
  };
  const setSelectedDateForStartDate = (date, name) => {
    const formattedDate = format(date, 'dd-MMM-yy');
    const dt = formattedDate.split("-")[2];
      let tempDt = dt?.length === 2 ? 20 + dt : dt;
      const newYear = new Date(formattedDate).getFullYear();
      if (name === "contractStartDate") {
          setSelectedYear(Number(tempDt));
          const currentYear = new Date(formData.contractStartDate).getFullYear();
         if (newYear !== currentYear) {
           setMilestoneAmountData(0,tempDt);
         }
      } else if(name === "contractEndDate"){
        const currentYear = new Date(formData.contractEndDate).getFullYear();
        if (newYear !== currentYear) {  
          setMilestoneAmountData(0, tempDt);
        }
      }
    
  };
const setMilestoneAmountData =(rev, yr)=>{
  setFormData((prevData) => ({
    ...prevData,
    milestoneAmount: [
      ...prevData.milestoneAmount,
      {
        revision: rev,
        year: Number(yr),
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
}
  const handleChange = (e, name) => {
    const value = e.target ? e.target.value : e;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value instanceof Date ? format(value, 'dd-MMM-yy') : value,
    }));
    const error = validateField(name, value);
    setErrors({
      ...errors,
      [name]: error,
    });
    if (name === "contractStartDate" || name === "contractEndDate") {
      setSelectedDateForStartDate(value, name);
    }
  };
  const validateField = (name, value) => {
    let error = "";
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
    } else if (name === "bpSubPortfolio") {
      if (!value) {
        error = "BP sub portfolio is required";
      }
    } else if (name === "contractCurrency") {
      if (!value) {
        error = "Contract currency is required";
      }
    } else if (name === "contractFGID") {
      if (!value) {
        error = "Contract FGID is required";
      }
    }
    return error;
  };
  const validateDisabledFields = (name, value) => {
    if (
      name === "contractCurrency" &&
      selectedRevision?.length > 1 &&
      value !== ""
    ) {
      return true;
    }
    if (name === "contractFGID" && value !== "") {
      return true;
    }
    // else if(name === "contractStartDate" && selectedRevision?.length === 1 && value !== ""){
    //   return true;
    // }
  };
  // const handleYearChange = (e, yearIndex, month) => {
  //   const value = e.target.value;
  //   setFormData((prevData) => {
  //     const updatedMilestoneAmount = [...prevData.milestoneAmount];
  //     updatedMilestoneAmount[yearIndex].month[month] = value;
  //     return { ...prevData, milestoneAmount: updatedMilestoneAmount };
  //   });
  // };

  const handleYearValueChange = (
    e,
    yearIndex,
    monthVal,
    monthIndex,
    revision
  ) => {
    const newYear = e.target.value;
    const monthNames = [
      "jan",
      "feb",
      "mar",
      "apr",
      "may",
      "jun",
      "jul",
      "aug",
      "sep",
      "oct",
      "nov",
      "dec",
    ];
    let monthKey = monthNames[monthIndex];
    const updatedData = formData.milestoneAmount.map((item, index) => {
      if (item.year === selectedYear && item.revision === revision) {
        return {
          ...item,
          month: {
            ...item.month,
            [monthKey]: newYear, // Store the new data
          },
        };
      }
      return item;
    });
    handleMonthValueChange(updatedData);
  };

  const handleMonthValueChange = (updatedData) => {
    setFormData((prevData) => {
      // const updatedMilestoneAmount = [...prevData.milestoneAmount];
      // if(updatedMilestoneAmount[yearIndex].year !== selectedYear){
      //   updatedMilestoneAmount[updatedMilestoneAmount.length - 1].month[monthKey] = newYear;
      // }else{
      //   updatedMilestoneAmount[yearIndex].month[monthKey] = newYear;
      // }
      return { ...prevData, milestoneAmount: updatedData };
    });
  };

  const findDuplicateYears = () => {
    const years = [
      ...new Set(
        formData?.milestoneAmount
          .filter((item) => item.year != null && item.year !== "")
          .map((item) => item.year)
      ),
    ];

    return years;
  };

  const addNewRevision = () => {
    if (
      !selectedYear &&
      formData.contractStartDate === "" &&
      formData.contractEndDate === ""
    ) {
      alert("Please fill the contract start date and end date first.");
      return;
    }
    const cleanedMilestoneAmount = formData?.milestoneAmount.map((item) => {
      return (
        item.month && Object.values(item.month).some((value) => value !== "")
      );
    });
    const containsTrue = cleanedMilestoneAmount.some((value) => value === true);
    if (!containsTrue) {
      alert("Please fill in the existing year before adding a new one.");
      return;
    }
    setFormData((prevData) => ({
      ...prevData,
      milestoneAmount: [
        ...prevData.milestoneAmount,
        {
          revision: selectedYearData.length,
          year: Number(selectedYear),
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
  const addNewRevisionData = () => {
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
  };
  const deleteRevision = (yearIndex, revision) => {
    setFormData((prevData) => {
      const updatedMilestoneAmount = [...prevData.milestoneAmount];
      const filterData = updatedMilestoneAmount.filter(
        (item) => !(item.revision === revision && item.year === selectedYear)
      );
      return { ...prevData, milestoneAmount: filterData };
    });
  };

  const onSaveChanges = () => {
    const cleanedMilestoneAmount = formData.milestoneAmount.filter(
      (milestone) =>
        milestone.year !== "" &&
        Object.values(milestone.month).some((value) => value !== "")
    );

    // const updatedFormData = {
    //   ...formData,
    //   milestoneAmount: cleanedMilestoneAmount,
    // };

    // if (modalType === "edit") {
    //   const updatedContractData = contractData.map((item) =>
    //     item.id === updatedFormData.id ? updatedFormData : item
    //   );
    //   setContractData(updatedContractData);
    // } else {
    //   setContractData([...contractData, updatedFormData]);
    // }
    if (modalType === "add") {
      addNewContract();
    } else if (modalType === "edit") {
      updateEditedContract();
    }
  };
  const updateEditedContract = () => {
    contractsService
      .updateEditedContract(formData)
      .then((resp) => {
        console.log(resp);
        handleCloseModal();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const addNewContract = () => {
    contractsService
      .addContract(formData)
      .then((resp) => {
        console.log(resp);
        handleCloseModal();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const resetErrorMessages = () => {
    setErrors({
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
  };
  const handleCloseModal = () => {
    setSelectedYear(null);
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
    resetErrorMessages();
    onClose();
    if (modalType === "edit" || modalType === "add") {
      onFetchData();
    }
  };

  // const addNewRevisionYear = (e) => {
  //   setFormData((prevData) => {
  //     const updatedMilestoneAmount = [
  //       {
  //         revision:
  //           selectedYearData?.length <= 1 ? 0 : selectedYearData?.length,
  //         year: parseInt(e.target.value),
  //         month: { ...prevData.milestoneAmount[0].month },
  //       },
  //     ];
  //     return { ...prevData, milestoneAmount: updatedMilestoneAmount };
  //   });
  // };
  const validateStartAndEndDate = () => {
    if (!selectedYear && !formData.contractStartDate && !formData.contractEndDate) {
      alert("Please fill the contract start date and end date first.");
      return;
    }
  };
  const addYearsForStartAndEndDate = () => {
    const yearsInTemp = new Set(
      formData.milestoneAmount.map((item) => item.year)
    );

    // Find the min and max years from the array
    const minYear = Math.min(
      ...formData.milestoneAmount.map((item) => +item.year)
    );
    const maxYear = Math.max(
      ...formData.milestoneAmount.map((item) => +item.year)
    );

    // Generate all years from minYear to maxYear
    const missingYears = Array.from(
      { length: maxYear - minYear + 1 },
      (_, i) => minYear + i
    ).filter((year) => !yearsInTemp.has(year)); // Filter out years that already exist
    // Add the missing years to the temp array
    const newYears = missingYears.map((year) => ({
      revision: 0,
      year: Number(year),
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
    }));
    formData.milestoneAmount.push(...newYears);
    formData.milestoneAmount.sort(
      (a, b) => parseInt(a.year, 10) - parseInt(b.year, 10)
    );
  };
  const handleDateChange = (date, fieldName) => {
    handleChange(date, fieldName); // Update form data
    setIsCalendarOpen(null); // Close calendar once date is selected
  };
  const handleCalendarClick = (fieldName) => {
    setIsCalendarOpen(isCalendarOpen === fieldName ? null : fieldName); // Toggle visibility of calendar
  };
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
                              readOnly={
                                modalType === "view" ||
                                validateDisabledFields(
                                  field.name,
                                  formData[field.name]
                                )
                              }
                            />
                          </div>
                        ) : field.fieldType === "calender" ? (
                          <div>
                            <DatePickerInput
                              key={field.name}
                              field={field}
                              formData={formData}
                             // handleChange={handleChange}
                              isCalendarOpen={isCalendarOpen}
                              handleCalendarClick={handleCalendarClick}
                              handleDateChange={handleDateChange}
                              modalType={modalType}
                              validateDisabledFields={validateDisabledFields}
                            />
                          </div>
                        ) : (
                          <div className="inputSelectField" key={field.name}>
                            <SelectField
                              label={field.label}
                              value={formData[field.name]}
                              onChange={(e) => handleChange(e, field.name)}
                              options={selectOptions[field.name] || []}
                              readOnly={
                                modalType === "view" ||
                                validateDisabledFields(
                                  field.name,
                                  formData[field.name]
                                )
                              }
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
                            key={field.name}
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
                    onClick={validateStartAndEndDate}
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
                        onClick={addNewRevision}
                      >
                        Add New Revision
                      </Button>
                    )}
                    {selectedYear !== undefined && (
                      <div className="milestone-section">
                        {formData?.milestoneAmount &&
                          findDuplicateYears(formData.milestoneAmount).map(
                            (milestone, index) => (
                              <div
                                key={index}
                                className={`year-section ${
                                  selectedYear === milestone ? "active" : ""
                                }`}
                                onClick={() => handleTabClick(milestone)}
                              >
                                {milestone}
                              </div>
                            )
                          )}
                      </div>
                    )}
                    <Table>
                      <thead>
                        <tr>
                          <td>PO Revision</td>
                          <td>Jan</td>
                          <td>Feb</td>
                          <td>Mar</td>
                          <td>Apr</td>
                          <td>May</td>
                          <td>Jun</td>
                          <td>Jul</td>
                          <td>Aug</td>
                          <td>Sep</td>
                          <td>Oct</td>
                          <td>Nov</td>
                          <td>Dec</td>
                          <td>Action</td>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedYearData &&
                          selectedYearData.map((month, index) => (
                            <tr key={index}>
                              <td>
                                {month.revision === 0
                                  ? "Original"
                                  : `Revision` + month.revision}
                              </td>
                              <>
                                {month?.month &&
                                  Object.values(month?.month).map(
                                    (mon, monIndex) => (
                                      <td className="month-textfield">
                                        <InputField
                                          label=""
                                          type="text"
                                          name={`month-${index}`}
                                          value={mon}
                                          onChange={(e) =>
                                            handleYearValueChange(
                                              e,
                                              index,
                                              mon,
                                              monIndex,
                                              month.revision
                                            )
                                          }
                                          readOnly={modalType === "view"}
                                        />
                                      </td>
                                    )
                                  )}
                                {month.revision !== 0 &&
                                  modalType !== "view" && (
                                    <button
                                      onClick={() =>
                                        deleteRevision(index, month.revision)
                                      }
                                      className="trash-button"
                                      disabled={
                                        formData.milestoneAmount.length === 1
                                      }
                                    >
                                      <FaTrash />
                                    </button>
                                  )}
                              </>
                            </tr>
                          ))}
                      </tbody>
                    </Table>
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
