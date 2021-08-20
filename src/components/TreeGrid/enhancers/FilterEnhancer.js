import { Filter } from '@syncfusion/ej2-react-treegrid';
import { createEnhancer } from './createEnhancer';

export const FilterEnhancer = createEnhancer({
  allowFiltering: true,
  filterSettings: { type: 'Menu' }
}, Filter);
