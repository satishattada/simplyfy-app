import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { FaCalendarAlt } from 'react-icons/fa';
import './styles.css';
import "react-datepicker/dist/react-datepicker.css";

const DatePickerInput = ({ field, formData, isCalendarOpen, handleCalendarClick, handleDateChange, modalType, validateDisabledFields = () => false }) => (
    
    <div className="inputField" key={field.name}>
    <div className="input-wrapper">
    <label className='inputFieldLabelStyle'>    
          {field.label}
        </label>
      <input
        type="text" className="inputdatefield"
        value={formData[field.name] ? formData[field.name] : ''}
        readOnly
        placeholder="Select a date"
      />
      <button
        type="button"
        onClick={() => handleCalendarClick(field.name)}
        disabled={modalType === "view" || validateDisabledFields(field.name, formData[field.name])}
      >
        <FaCalendarAlt /> {/* Calendar Icon */}
      </button>
    </div>
    {isCalendarOpen === field.name && (
      <DatePicker
        selected={formData[field.name] ? new Date(formData[field.name]) : null}
        onChange={(e) => handleDateChange(e, field.name)}
        inline
      />
    )}
  </div>
);

export default DatePickerInput;
