import React from 'react'
import { ColorPickerComponent } from '@syncfusion/ej2-react-inputs';
import { ColumnNameInput } from './ColumnNameInput';

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

export const ColumnAttributesInput = ({ onChange, value }) => {
  const [currentColumnId, setCurrentColumn] = React.useState(Object.keys(value)[0]);
  const currentColumnAttrs = value[currentColumnId];

  const changeColumnAttrs = (newAttrs) => onChange({
    ...value,
    [currentColumnId]: newAttrs
  });

  const changeColumnStyle = (newStyle) => changeColumnAttrs({
    ...currentColumnAttrs,
    customAttributes: {
      ...currentColumnAttrs.customAttributes,
      style: newStyle
    }
  });

  const onColumnSelect = e => setCurrentColumn(e.target.value);

  const onColumnNameChange = newColumnName => changeColumnAttrs({
    ...currentColumnAttrs,
    headerText: newColumnName
  });

  const onFontSelect = e => changeColumnStyle({
    ...currentColumnAttrs.customAttributes.style,
    fontFamily: e.target.value
  });

  const onAlignmentSelect = e => changeColumnAttrs({
    ...currentColumnAttrs,
    textAlign: e.target.value
  });

  const onColorSelect = ({ value }) => changeColumnStyle({
    ...currentColumnAttrs.customAttributes.style,
    color: value
  });

  const onFormatSelect = e => changeColumnAttrs({
    ...currentColumnAttrs,
    ...dataFormatsAvailable[e.target.value].attrs
  })

  return (
    <>
      <div className="form-group row">
        <label htmlFor="currentColumnSelectInput" className="col-sm-5 col-form-label">Column</label>
        <div className="col-sm-7 px-2">
          <select value={currentColumnId} onChange={onColumnSelect} className="form-control px-1" id="currentColumnSelectInput">
            {
              Object.entries(value)
                .map(([id, { headerText }]) => <option key={id} value={id}>{headerText}</option>)
            }
          </select>
        </div>
      </div>

      <div className="form-group row">
        <label htmlFor="columnNameInput" className="col-sm-5 col-form-label">Name</label>
        <div className="col-sm-7 px-2">
          <ColumnNameInput value={currentColumnAttrs.headerText} onChange={onColumnNameChange} className="form-control" id="columnNameInput"/>
        </div>
      </div>

      <div className="form-group row">
        <label htmlFor="fontSelectInput" className="col-sm-5 col-form-label">Font</label>
        <div className="col-sm-7 px-2">
          <select value={currentColumnAttrs.customAttributes.style.fontFamily} onChange={onFontSelect} className="form-control px-1" id="fontSelectInput">
            {
              fontsAvailable.map(font => <option key={font} value={font}>{font}</option>)
            }
          </select>
        </div>
      </div>

      <div className="form-group row">
        <label htmlFor="formatSelectInput" className="col-sm-5 col-form-label">Format</label>
        <div className="col-sm-7 px-2">
          <select value={getFormat(currentColumnAttrs)} onChange={onFormatSelect} className="form-control px-1" id="formatSelectInput">
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
          <ColorPickerComponent value={currentColumnAttrs.customAttributes.style.color} change={onColorSelect} className="form-control px-1" id="colorPicker"/>
        </div>
      </div>

      <div className="form-group row">
        <label htmlFor="alignmentSelectInput" className="col-sm-5 col-form-label">Font</label>
        <div className="col-sm-7 px-2">
          <select value={currentColumnAttrs.textAlign || 'Left'} onChange={onAlignmentSelect} className="form-control px-1" id="alignmentSelectInput">
            {
              textAlignmentsAvailable.map(value => <option key={value} value={value}>{value}</option>)
            }
          </select>
        </div>
      </div>
    </>
  );
};

