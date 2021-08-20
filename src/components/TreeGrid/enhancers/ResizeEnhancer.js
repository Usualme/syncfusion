import { Resize } from '@syncfusion/ej2-react-treegrid';
import { createEnhancer } from './createEnhancer';

export const ResizeEnhancer = createEnhancer({
  allowResizing: true,
}, Resize);
