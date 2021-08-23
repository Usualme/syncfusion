import React from 'react'
import { TreeGridComponent, ColumnsDirective, ColumnDirective, Inject } from '@syncfusion/ej2-react-treegrid';
import { sampleData } from './data';
import { ColumnMenuEnhancer } from './enhancers/ColumnMenuEnhancer';
import { PaginationEnhancer } from './enhancers/PaginationEnhancer';
import { SortEnhancer } from './enhancers/SortEnhancer';
import { EditColumnsEnhancer } from './enhancers/EditColumnsEnhancer';
import { FilterEnhancer } from './enhancers/FilterEnhancer';
import { FilterSelect } from './FilterSelect';
import { ColumnAttributesInput } from './ColumnAttributesInput';

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

const BaseTreeGrid = ({ injectServices, columns, treeGridRef, ...otherProps }) => {
  return (
    <TreeGridComponent dataSource={sampleData} childMapping='subtasks' treeColumnIndex={1} {...otherProps} ref={treeGridRef}>
      <ColumnsDirective>
        {
          Object.entries(columns)
            .map(([field, columnProps]) => <ColumnDirective key={field} field={field} {...columnProps} />)
        }
      </ColumnsDirective>
      {injectServices && <Inject services={injectServices}/>}
    </TreeGridComponent>
  );
};

export const TreeGrid = () => {
  const [filterMode, setFilterMode] = React.useState('Menu');
  const [columns, setColumns] = React.useState(defaultColumnDefinitions);
  const treeGridRef = React.useRef(null);
  React.useEffect(() => {
    // If column names changed - refresh them manually, because TreeGridComponent won't do it for us
    treeGridRef.current.refreshColumns();
  }, [columns, treeGridRef])

  return (
    <div id="tree-grid" className="row no-gutters">
      <div className="col-lg-3 py-2">
        <div className="container">
          <FilterSelect value={filterMode} onChange={setFilterMode}/>
          <hr/>
          <ColumnAttributesInput value={columns} onChange={setColumns}/>
        </div>
      </div>
      <div className="col-lg-9 control-section">
        <FilterEnhancer filterMode={filterMode}>
          <EditColumnsEnhancer>
            <PaginationEnhancer>
              <SortEnhancer>
                <ColumnMenuEnhancer>
                  <BaseTreeGrid columns={columns} treeGridRef={treeGridRef}/>
                </ColumnMenuEnhancer>
              </SortEnhancer>
            </PaginationEnhancer>
          </EditColumnsEnhancer>
        </FilterEnhancer>
      </div>
    </div>
  )
};
