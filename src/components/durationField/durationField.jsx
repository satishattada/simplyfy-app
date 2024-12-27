import React from 'react';
import './styles.css';

const DurationField = ({ label, duration, durationType, onChangeDuration, onChangeDurationType }) => {
  return (
    <div className="durationFieldcontainer">
      <label className="durationFieldLabelStyle">
        {label}
      </label>
      <div style={{ display: 'flex' }}>
        <input
          style={{ width: '50%', height: '40px', padding: '10px', fontSize: '16px', borderRadius: '5px 0 0 5px', border: '1px solid #ccc' }}
          type="number"
          value={duration}
          onChange={onChangeDuration}
          min={1}
        />
        <select
          style={{ width: '50%', height: '60px', padding: '10px', fontSize: '16px', borderRadius: '0 5px 5px 0', border: '1px solid #ccc' }}
          value={durationType}
          onChange={onChangeDurationType}
        >
          <option value="months">Months</option>
          <option value="years">Years</option>
        </select>
      </div>
    </div>
  );
};

export default DurationField;