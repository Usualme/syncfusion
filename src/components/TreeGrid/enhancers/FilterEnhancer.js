import { Filter } from '@syncfusion/ej2-react-treegrid';
import { createEnhancer } from './createEnhancer';

export const FilterEnhancer = createEnhancer(({ filterMode }) => ({
  allowFiltering: true,
  filterSettings: { type: filterMode }
}), Filter);
