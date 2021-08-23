import React from 'react'

export const ColumnNameInput = ({ onChange, value, ...props }) => {
  const [currentColumnName, setCurrentColumnName] = React.useState(value);

  // Reset state to `value` prop after Parent re-render
  React.useEffect(() => {
    setCurrentColumnName(value);
  }, [value]);

  const onColumnNameChange = e => {
    setCurrentColumnName(e.target.value);
  };

  const resetValue = () => setCurrentColumnName(value);

  const onColumnNameKeyDown = e => {
    if (e.key === 'Escape') {
      e.target.blur();
      resetValue();
      return;
    }
    if (e.key === 'Enter') {
      e.target.blur();
      onChange(currentColumnName);
      return;
    }
  }

  return <input
    type="text"
    value={currentColumnName}
    onBlur={resetValue}
    onChange={onColumnNameChange}
    onKeyDown={onColumnNameKeyDown}
    {...props}
  />;
};

