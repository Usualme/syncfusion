import { Reorder, Resize } from '@syncfusion/ej2-react-treegrid';
import { createEnhancer } from './createEnhancer';

export const EditColumnsEnhancer = createEnhancer({
  allowResizing: true,
  allowReordering: true
}, [Reorder, Resize]);
