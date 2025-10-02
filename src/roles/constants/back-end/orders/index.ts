import { ordersTable } from '../../front-end/tables/orders';

export const orders = {
  sectionId: 'ordersSection',
  title: 'Поръчки',
  icon: 'FaShoppingCart',
  url: '/dashboard/orders',
  tables: [ordersTable],
  apis: ['GET::/orders', 'GET::/lots/available', 'POST::/orders/create'],
};
