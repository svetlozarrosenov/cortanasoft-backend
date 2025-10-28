import { suppliersTable } from '../../front-end/tables/suppliers';

export const suppliers = {
  sectionId: 'suppliersSection',
  title: 'Доставчици',
  icon: 'FaTruck',
  url: '/dashboard/suppliers',
  tables: [suppliersTable],
  apis: [
    'GET::/suppliers',
    'POST::/suppliers/create',
    'PUT::/suppliers/update/:id',
  ],
};
