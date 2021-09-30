import React, { useRef, useState } from 'react';
import { ColumnDirective, ColumnsDirective, ContextMenu, Reorder, Resize } from '@syncfusion/ej2-react-treegrid';
import { DialogComponent } from '@syncfusion/ej2-react-popups';
import { createEnhancer, mergeToArray, mergeToFunction } from './createEnhancer';
import { ColumnAttributesForm } from '../ColumnAttributesForm';

const CHANGE_COLUMN_ATTRIBUTE = 'change_column_attribute';

const defaultStyle = {
  fontFamily: 'sans-serif',
  color: '#000'
}

const defaultColumnDefinitions = {
  taskID: {
    type: 'number',
    headerText: 'Task Id',
    width: '100',
    textAlign: 'Right',
    customAttributes: {
      style: { ...defaultStyle }
    }
  },
  taskName: {
    type: 'string',
    headerText: 'Task Name',
    width: '150',
    customAttributes: {
      style: { ...defaultStyle }
    }
  },
  startDate: {
    type: 'date',
    headerText: 'Start Date',
    format: 'yMd',
    width: '90',
    textAlign: 'Right',
    customAttributes: {
      style: { ...defaultStyle }
    }
  },
  endDate: {
    type: 'date',
    headerText: 'End Date',
    width: '90',
    format: 'yMd',
    textAlign: 'Right',
    visible: false,
    customAttributes: {
      style: { ...defaultStyle }
    }
  },
  approved: {
    type: 'boolean',
    headerText: 'Approved',
    width: '80',
    displayAsCheckBox: true,
    customAttributes: {
      style: { ...defaultStyle }
    }
  },
  priority: {
    type: 'number',
    headerText: 'Priority',
    width: '80',
    customAttributes: {
      style: { ...defaultStyle }
    }
  },
  progress: {
    type: 'number',
    headerText: 'Progress',
    width: '80',
    visible: false,
    customAttributes: {
      style: { ...defaultStyle }
    }
  },
  duration: {
    type: 'number',
    headerText: 'Duration',
    width: '80',
    visible: false,
    customAttributes: {
      style: { ...defaultStyle }
    }
  },
}

export const EditColumnsEnhancer = createEnhancer(({ treeGridRef, additionalComponents, contextMenuClick, contextMenuItems, contextMenuOpen }) => {
  const [columns, setColumns] = React.useState(defaultColumnDefinitions);
  React.useEffect(() => {
    // If column names changed - refresh them manually, because TreeGridComponent won't do it for us
    treeGridRef.current.refreshColumns();
  }, [columns, treeGridRef]);

  const [showDialog, setShowDialog] = useState(false);
  const currentColumn = useRef(null);

  const editColumnsContextMenuOpen = (e) => {
    const field = e?.column?.field;
    if (field) {
      currentColumn.current = field;
    }
  };

  const showAttributesDialog = () => {
    setShowDialog(true);
  };

  const hideAttributesDialog = () => {
    setShowDialog(false);
  };

  const handleChangeColumnAttributes = (columnId, newColumnAttributes) => {
    setColumns({
      ...columns,
      [columnId]: newColumnAttributes
    });
    hideAttributesDialog();
  };

  const editColumnsContextMenuClick = (e) => {
    switch (e.item.properties.id) {
      case CHANGE_COLUMN_ATTRIBUTE:
        return showAttributesDialog(e);
      default:
        return;
    }
  };

  const columnAttributes = columns[currentColumn?.current];

  return {
    allowResizing: true,
    allowReordering: true,
    contextMenuItems: mergeToArray(
      contextMenuItems,
      {
        text: 'Change Column Styles Or Name',
        target: '.e-headercontent',
        id: CHANGE_COLUMN_ATTRIBUTE
      }
    ),
    contextMenuClick: mergeToFunction(contextMenuClick, editColumnsContextMenuClick),
    contextMenuOpen:  mergeToFunction(contextMenuOpen, editColumnsContextMenuOpen),
    additionalComponents: mergeToArray(
      additionalComponents,
      <DialogComponent key="columnStyleDialog" visible={showDialog} height='100%' header={`Column "${columnAttributes?.headerText}" Attributes`}>
        <div>
          {
            currentColumn?.current &&
              <ColumnAttributesForm
                columnId={currentColumn?.current}
                columnAttributes={columns[currentColumn?.current]}
                onCancel={hideAttributesDialog}
                onSubmit={handleChangeColumnAttributes}
              />
          }
        </div>
      </DialogComponent>,
      <ColumnsDirective key="columnsDirective">
        {
          Object.entries(columns)
            .map(([field, columnProps]) => <ColumnDirective key={field} field={field} {...columnProps} />)
        }
      </ColumnsDirective>
    )
  };
}, [ContextMenu, Reorder, Resize]);
