import { ColorPickerComponent } from '@syncfusion/ej2-react-inputs';
import React, { useEffect, useState } from 'react';

const fontsAvailable = [
  'serif',
  'sans-serif'
];

const textAlignmentsAvailable = [
  "Right",
  "Left",
  "Center",
  "Justify"
];

const dataFormatsAvailable = {
  boolean: { label: 'Boolean', attrs: { type: 'boolean', displayAsCheckBox: false }},
  checkbox: { label: 'Checkbox', attrs: { type: 'boolean', displayAsCheckBox: true }},
  date: { label: 'Date', attrs: { type: 'date', format: 'yMd' }},
  datetime: { label: 'Date and time', attrs: { type: 'datetime', format: "MM/dd/yyyy hh:mm:ss a" }},
  number: { label: 'Number', attrs: { type: 'number', }},
  string: { label: 'String', attrs: { type: 'string', }},
};

const getFormat = (attrs) => {
  switch (attrs.type) {
    case 'date':
      return attrs.type;
    case 'datetime':
      return attrs.type;
    case 'boolean':
      return attrs.displayAsCheckBox ? 'checkbox' : attrs.type;
    case 'number':
      return attrs.type;
    case 'string':
    default:
      return 'string';
  }
};

export const ColumnAttributesForm = ({ columnId, columnAttributes, onSubmit, onCancel }) => {
  const [changedColumnAttributes, setChangedColumnAttributes] = useState(columnAttributes);

  useEffect(() => {
    setChangedColumnAttributes(columnAttributes);
  }, [columnAttributes]);

  const changeColumnStyle = (newStyle) => setChangedColumnAttributes({
    ...changedColumnAttributes,
    customAttributes: {
      ...changedColumnAttributes.customAttributes,
      style: newStyle
    }
  });

  const applyChanges = (e) => {
    e.preventDefault();
    onSubmit(columnId, changedColumnAttributes);
  };
  const cancelChanges = (e) => {
    e.preventDefault();
    onCancel();
  };

  const onColumnNameChange = event => setChangedColumnAttributes({
    ...changedColumnAttributes,
    headerText: event.target.value
  });

  const onFontSelect = e => changeColumnStyle({
    ...changedColumnAttributes.customAttributes.style,
    fontFamily: e.target.value
  });

  const onAlignmentSelect = e => setChangedColumnAttributes({
    ...changedColumnAttributes,
    textAlign: e.target.value
  });

  const onColorSelect = ({ value }) => changeColumnStyle({
    ...changedColumnAttributes.customAttributes.style,
    color: value
  });

  const onFormatSelect = e => setChangedColumnAttributes({
    ...changedColumnAttributes,
    ...dataFormatsAvailable[e.target.value].attrs
  })

  return (
    <form onSubmit={applyChanges}>
      <div className="form-group row">
        <label htmlFor="columnNameInput" className="col-sm-5 col-form-label">Name</label>
        <div className="col-sm-7 px-2">
          <input value={changedColumnAttributes.headerText} onChange={onColumnNameChange} className="form-control" id="columnNameInput"/>
        </div>
      </div>

      <div className="form-group row">
        <label htmlFor="fontSelectInput" className="col-sm-5 col-form-label">Font</label>
        <div className="col-sm-7 px-2">
          <select value={changedColumnAttributes.customAttributes.style.fontFamily} onChange={onFontSelect} className="form-control px-1" id="fontSelectInput">
            {
              fontsAvailable.map(font => <option key={font} value={font}>{font}</option>)
            }
          </select>
        </div>
      </div>

      <div className="form-group row">
        <label htmlFor="formatSelectInput" className="col-sm-5 col-form-label">Data Format</label>
        <div className="col-sm-7 px-2">
          <select value={getFormat(changedColumnAttributes)} onChange={onFormatSelect} className="form-control px-1" id="formatSelectInput">
            {
              Object.entries(dataFormatsAvailable)
                .map(([value, { label }]) => <option key={value} value={value}>{label}</option>)
            }
          </select>
        </div>
      </div>

      <div className="form-group row">
        <label htmlFor="colorPicker" className="col-sm-5 col-form-label">Text color</label>
        <div className="col-sm-7 px-2">
          <ColorPickerComponent value={changedColumnAttributes.customAttributes.style.color} change={onColorSelect} className="form-control px-1" id="colorPicker"/>
        </div>
      </div>

      <div className="form-group row">
        <label htmlFor="alignmentSelectInput" className="col-sm-5 col-form-label">Text Align</label>
        <div className="col-sm-7 px-2">
          <select value={changedColumnAttributes.textAlign || 'Left'} onChange={onAlignmentSelect} className="form-control px-1" id="alignmentSelectInput">
            {
              textAlignmentsAvailable.map(value => <option key={value} value={value}>{value}</option>)
            }
          </select>
        </div>
      </div>

      <div className="p-2" style={{maxWidth: "max-content"}}>
        <button type="submit" className="btn btn-primary m-1">Apply</button>
        <button type="button" className="btn btn-secondary m-1"onClick={cancelChanges}>Cancel</button>
      </div>
    </form>
  );
};

