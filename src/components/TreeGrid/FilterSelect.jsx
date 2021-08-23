import React from 'react'

export const FilterSelect = ({ onChange, ...props }) => {
  return (
    <div className="form-group row">
      <label htmlFor="fiterModeSelectInput" className="col-sm-5 col-form-label pr-0">Filter mode</label>
      <div className="col-sm-7 px-2">
        <select {...props} onChange={e => onChange(e.target.value)} id="fiterModeSelectInput" className="form-control px-1">
          <option value="Menu">Menu</option>
          <option value="FilterBar">FilterBar</option>
        </select>
      </div>
    </div>
  );
};
