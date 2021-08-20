import { Page } from '@syncfusion/ej2-react-treegrid';
import { createEnhancer } from './createEnhancer';

export const PaginationEnhancer = createEnhancer({
  allowPaging: true,
  pageSettings: {
    pageCount: 5,
    pageSize: 20,
    pageSizes: true
  },
}, Page);
