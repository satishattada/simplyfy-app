import React from 'react';
import './styles.css';

const SelectField = ({ label, value, onChange, options }) => {
    return (
      <div className='selectFieldcontainer'>
        <label className='selectFieldLabelStyle'>
          {label}
        </label>
        <select
          style={{ width: '100%', height: '40px', padding: '10px', fontSize: '16px', borderRadius: '5px', border: '1px solid #ccc' }}
          value={value}
          onChange={onChange}
        >
          {options.map((option) => (
            <option value={option.value}>{option.label}</option>
          ))}
        </select>
      </div>
    );
  };

  export default SelectField;