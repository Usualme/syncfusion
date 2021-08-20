import { Page } from '@syncfusion/ej2-react-treegrid';
import { createEnhancer } from './createEnhancer';

export const PaginationEnhancer = createEnhancer({
  allowPaging: true,
  pageSettings: { pageSize: 20, pageSizes: true },
}, Page);
