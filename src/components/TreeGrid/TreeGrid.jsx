import React from 'react'
import { TreeGridComponent, ColumnsDirective, ColumnDirective, Inject } from '@syncfusion/ej2-react-treegrid';
import { sampleData } from './data';
import { ColumnMenuEnhancer } from './enhancers/ColumnMenuEnhancer';
import { PaginationEnhancer } from './enhancers/PaginationEnhancer';
import { SortEnhancer } from './enhancers/SortEnhancer';
import { ResizeEnhancer } from './enhancers/ResizeEnhancer';
import { FilterEnhancer } from './enhancers/FilterEnhancer';

const BaseTreeGrid = ({ injectServices, ...otherProps }) => {
  return (
    <TreeGridComponent dataSource={sampleData} childMapping='subtasks' treeColumnIndex={1} {...otherProps}>
      <ColumnsDirective>
        <ColumnDirective field='taskID' headerText='Task ID' width='100' textAlign='Right'></ColumnDirective>
        <ColumnDirective field='taskName' headerText='Task Name' width='150'></ColumnDirective>
        <ColumnDirective field='startDate' headerText='Start Date' width='90' format='yMd' textAlign='Right' />
        <ColumnDirective field='approved' headerText='Approved' width='80' type='boolean' displayAsCheckBox={true}/>
        <ColumnDirective field='priority' headerText='Priority' width='80' />
      </ColumnsDirective>
      {injectServices && <Inject services={injectServices}/>}
    </TreeGridComponent>
  );
};

export const TreeGrid = () => {
  return (
    <div className="col-lg-9 control-section">
      <div className="content-wrapper">
        <div className='control-pane'>
          <div className='control-section'>
            <FilterEnhancer>
              <ResizeEnhancer>
                <PaginationEnhancer>
                  <SortEnhancer>
                    <ColumnMenuEnhancer>
                      <BaseTreeGrid/>
                    </ColumnMenuEnhancer>
                  </SortEnhancer>
                </PaginationEnhancer>
              </ResizeEnhancer>
            </FilterEnhancer>
          </div>
        </div>
      </div>
    </div>
  )
};
