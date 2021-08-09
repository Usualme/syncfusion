import React from 'react'
import { TreeGridComponent, ColumnsDirective, ColumnDirective, Page, Inject,
  ColumnMenu, Sort, Resize, Filter } from '@syncfusion/ej2-react-treegrid';
import { sampleData } from './data';

export const TreeGrid = () => {

  return (
    <div className="col-lg-9 control-section">
      <div className="content-wrapper">
      <div className='control-pane'>
        <div className='control-section'>
          <TreeGridComponent dataSource={sampleData} treeColumnIndex={1} childMapping= 'subtasks' height='70vh' allowPaging='true'
                pageSettings={{ pageSize: 20 }} allowSorting='true' allowFiltering='true' showColumnMenu='true'
                filterSettings={{ type:'Menu'}} >
            <ColumnsDirective>
              <ColumnDirective field='taskID' headerText='Task ID' width='100' textAlign='Right'></ColumnDirective>
              <ColumnDirective field='taskName' headerText='Task Name' width='150'></ColumnDirective>
              <ColumnDirective field='startDate' headerText='Start Date' width='90' format='yMd' textAlign='Right' />
              <ColumnDirective field='duration' headerText='Duration' width='80' textAlign='Right'/>
              <ColumnDirective field='progress' headerText='Progress' width='80' textAlign='Right'/>
              <ColumnDirective field='priority' headerText='Priority' width='80' />
            </ColumnsDirective>
            <Inject services={[Page, ColumnMenu, Sort, Resize, Filter]}/>
          </TreeGridComponent>
        </div>
      </div>
      </div>
    </div>
  )
};
