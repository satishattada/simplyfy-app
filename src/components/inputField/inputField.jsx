import React from 'react';
import './styles.css';

const InputField = ({ label, type, value, onChange, min, placeholder,readOnly}) => {
    return (
      <div className='inputFieldcontainer'>
        <label className='inputFieldLabelStyle'>
          {label}
        </label>
        <input
          className='inputStyle'
          type={type}
          value={value}
          onChange={onChange}
          min={min}
          placeholder={placeholder}
          disabled={readOnly}
        />
      </div>
    );
  };

  export default InputField;