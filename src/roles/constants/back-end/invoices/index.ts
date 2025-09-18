import { invoicesTable } from '../../front-end/tables/invoices';

export const invoices = {
  sectionId: 'invoicesSection',
  title: 'Фактури',
  url: '/dashboard/invoices',
  tables: [invoicesTable],
  apis: [
    'GET::/invoices',
    'GET::/invoices/:id',
    'PUT::/invoices/update/:id',
    'POST::/invoices/create',
  ],
};
