import { suppliersTable } from '../../front-end/tables/suppliers';

export const suppliers = {
  sectionId: 'suppliersSection',
  title: 'Доставчици',
  icon: 'FaTruck',
  url: '/dashboard/suppliers',
  tables: [suppliersTable],
  apis: [
    'GET::/supplies/suppliers',
    'POST::/supplies/supplier/create',
    'PUT::/supplies/supplier/update/:id',
  ],
};
