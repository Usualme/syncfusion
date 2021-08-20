import { Sort } from '@syncfusion/ej2-react-treegrid';
import { createEnhancer } from './createEnhancer';

export const SortEnhancer = createEnhancer({
  allowSorting: true,
}, Sort);
