import { Inject, TreeGridComponent } from '@syncfusion/ej2-react-treegrid';
import React from 'react';
import { ColumnMenuEnhancer } from './enhancers/ColumnMenuEnhancer';
import { EditColumnsEnhancer } from './enhancers/EditColumnsEnhancer';
import { EditRowsEnhancer } from './enhancers/EditRowsEnhancer';
import { FilterEnhancer } from './enhancers/FilterEnhancer';
import { ScrollEnhancer } from './enhancers/ScrollEnhancer';
import { SortEnhancer } from './enhancers/SortEnhancer';
import { sampleData } from './data';


const BaseTreeGrid = ({ injectServices, columns, treeGridRef, additionalComponents, ...otherProps }) => {
  return (
    <TreeGridComponent dataSource={sampleData} childMapping='subtasks' treeColumnIndex={1} {...otherProps} ref={treeGridRef}>
      {injectServices && <Inject services={injectServices}/>}
      { additionalComponents }
    </TreeGridComponent>
  );
};

export const TreeGrid = () => {
  const treeGridRef = React.useRef(null);

  return (
    <div id="tree-grid" className="row no-gutters control-section">
      <FilterEnhancer>
        <EditColumnsEnhancer treeGridRef={treeGridRef}>
            <SortEnhancer>
              <ColumnMenuEnhancer>
                <ScrollEnhancer>
                  <EditRowsEnhancer treeGridRef={treeGridRef}>
                    <BaseTreeGrid treeGridRef={treeGridRef}/>
                  </EditRowsEnhancer>
                </ScrollEnhancer>
              </ColumnMenuEnhancer>
            </SortEnhancer>
        </EditColumnsEnhancer>
      </FilterEnhancer>
    </div>
  )
};
