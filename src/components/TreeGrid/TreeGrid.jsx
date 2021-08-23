import React from 'react'
import { TreeGridComponent, ColumnsDirective, ColumnDirective, Inject } from '@syncfusion/ej2-react-treegrid';
import { sampleData } from './data';
import { ColumnMenuEnhancer } from './enhancers/ColumnMenuEnhancer';
import { PaginationEnhancer } from './enhancers/PaginationEnhancer';
import { SortEnhancer } from './enhancers/SortEnhancer';
import { EditColumnsEnhancer } from './enhancers/EditColumnsEnhancer';
import { FilterEnhancer } from './enhancers/FilterEnhancer';
import { FilterSelect } from './FilterSelect';
import { ColumnNamesInput } from './ColumnNamesInput';

const BaseTreeGrid = ({ injectServices, columnNames, treeGridRef, ...otherProps }) => {
  return (
    <TreeGridComponent dataSource={sampleData} childMapping='subtasks' treeColumnIndex={1} {...otherProps} ref={treeGridRef}>
      <ColumnsDirective>
        <ColumnDirective field='taskID' headerText={columnNames.taskID} width='100' textAlign='Right' />
        <ColumnDirective field='taskName' headerText={columnNames.taskName} width='150' />
        <ColumnDirective field='startDate' headerText={columnNames.startDate} width='90' format='yMd' textAlign='Right'/>
        <ColumnDirective field='endDate' headerText={columnNames.endDate} width='90' format='yMd' textAlign='Right' visible={false} />
        <ColumnDirective field='approved' headerText={columnNames.approved} width='80' type='boolean' displayAsCheckBox={true} />
        <ColumnDirective field='priority' headerText={columnNames.priority} width='80' />
        <ColumnDirective field='progress' headerText={columnNames.progress} width='80' visible={false} />
        <ColumnDirective field='duration' headerText={columnNames.duration} width='80' visible={false} />
      </ColumnsDirective>
      {injectServices && <Inject services={injectServices}/>}
    </TreeGridComponent>
  );
};

export const TreeGrid = () => {
  const [filterMode, setFilterMode] = React.useState('Menu');
  const [columnNames, setColumnNames] = React.useState({
    taskID: 'Task ID',
    taskName: 'Task Name',
    startDate: 'Start Date',
    endDate: 'End Date',
    approved: 'Approved',
    priority: 'Priority',
    progress: 'Progress',
    duration: 'Duration',
  });
  const treeGridRef = React.useRef(null);
  React.useEffect(() => {
    // If column names changed - refresh them manually, because TreeGridComponent won't do it for us
    treeGridRef.current.refreshColumns();
  }, [columnNames, treeGridRef])

  return (
    <div id="tree-grid" className="row no-gutters">
      <div className="col-lg-3 py-2">
        <div className="container">
          <FilterSelect value={filterMode} onChange={setFilterMode}/>
          <hr/>
          <ColumnNamesInput value={columnNames} onChange={setColumnNames}/>
        </div>
      </div>
      <div className="col-lg-9 control-section">
        <FilterEnhancer filterMode={filterMode}>
          <EditColumnsEnhancer>
            <PaginationEnhancer>
              <SortEnhancer>
                <ColumnMenuEnhancer>
                  <BaseTreeGrid columnNames={columnNames} treeGridRef={treeGridRef}/>
                </ColumnMenuEnhancer>
              </SortEnhancer>
            </PaginationEnhancer>
          </EditColumnsEnhancer>
        </FilterEnhancer>
      </div>
    </div>
  )
};
