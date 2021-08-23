import React from 'react'

export const FilterSelect = ({ onChange, ...props }) => {
  return (
    <div className="form-group row">
      <label htmlFor="fiterModeSelectInput" className="col-sm-6 col-form-label">Filter mode</label>
      <div className="col-sm-6">
        <select {...props} onChange={e => onChange(e.target.value)} id="fiterModeSelectInput" className="form-control">
          <option value="Menu">Menu</option>
          <option value="FilterBar">FilterBar</option>
        </select>
      </div>
    </div>
  );
};
