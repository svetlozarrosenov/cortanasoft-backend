import { clientsTable } from '../../front-end/tables/clients';

export const clients = {
  sectionId: 'clientsSection',
  title: 'Клиенти',
  url: '/dashboard/clients',
  tables: [clientsTable],
  apis: [
    'GET::/client',
    'POST::/client/create',
    'PUT::/client/update/:id',
    'DELETE::/client/delete/:id',
  ],
};
