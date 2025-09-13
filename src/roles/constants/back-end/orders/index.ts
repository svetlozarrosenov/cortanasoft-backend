import { ordersTable } from '../../front-end/tables/orders';

export const orders = {
  sectionId: 'ordersSection',
  title: 'Поръчки',
  url: 'dashboard/orders',
  tables: [ordersTable],
  apis: ['GET:: orders'],
};
