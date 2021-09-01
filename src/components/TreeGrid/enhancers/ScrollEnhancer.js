import { VirtualScroll } from '@syncfusion/ej2-react-treegrid';
import { createEnhancer } from './createEnhancer';

export const ScrollEnhancer = createEnhancer({
  enableVirtualization: true,
  enableStickyHeader: true,
  enableColumnVirtualization: true,
  height: '100%'
}, VirtualScroll);
