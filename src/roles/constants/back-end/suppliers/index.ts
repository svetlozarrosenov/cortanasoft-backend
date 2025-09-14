import { suppliersTable } from '../../front-end/tables/suppliers';

export const suppliers = {
  sectionId: 'suppliersSection',
  title: 'Доставчици',
  url: '/dashboard/suppliers',
  tables: [suppliersTable],
  apis: ['GET::/supplies/suppliers'],
};
