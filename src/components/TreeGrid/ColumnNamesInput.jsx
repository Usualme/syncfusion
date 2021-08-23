import React from 'react'

export const ColumnNamesInput = ({ onChange, value }) => {
  const [currentColumn, setCurrentColumn] = React.useState(Object.keys(value)[0]);
  const [columnNames, setColumnNames] = React.useState(value);

  const onColumnNameChanges = e => {
    setColumnNames({
      ...columnNames,
      [currentColumn]: e.target.value
    })
  };

  const onFormSubmit = (e) => {
    e.preventDefault();

    // Don't trigger redundant changes without actually changed values
    if (value[currentColumn] === columnNames[currentColumn]) return;

    onChange({
      ...value,
      [currentColumn]: columnNames[currentColumn]
    })
  };

  return (
    <form onSubmit={onFormSubmit}>
      <div className="form-group row">
        <label htmlFor="currentColumnSelectInput" className="col-sm-6 col-form-label">Rename column</label>
        <div className="col-sm-6">
          <select value={currentColumn} onChange={e => setCurrentColumn(e.target.value)} className="form-control" id="currentColumnSelectInput">
            {
              Object.entries(value)
                .map(([id, name]) => <option key={id} value={id}>{name}</option>)
            }
          </select>
        </div>
      </div>
      <div className="form-group row">
        <label htmlFor="columnNameInput" className="col-sm-6 col-form-label">to</label>
        <div className="col-sm-6">
          <input type="text" value={columnNames[currentColumn]} onChange={onColumnNameChanges} className="form-control" id="columnNameInput"/>
        </div>
      </div>
      <button className="btn btn-primary col-sm-12">Apply</button>
    </form>
  );
};

