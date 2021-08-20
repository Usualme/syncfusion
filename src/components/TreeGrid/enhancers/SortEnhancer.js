import { Sort } from '@syncfusion/ej2-react-treegrid';
import { createEnhancer } from './createEnhancer';

export const SortEnhancer = createEnhancer({
  allowSorting: true,
  sortSettings:  {
    columns: [
      { field: 'taskName', direction: 'Ascending' },
      { field: 'priority', direction: 'Ascending' }
    ]
  }
}, Sort);
