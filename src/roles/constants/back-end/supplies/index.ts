import { suppliesTable } from '../../front-end/tables/supplies';

export const supplies = {
  sectionId: 'suppliesSection',
  title: 'Доставки',
  icon: 'FaShippingFast',
  url: '/dashboard/supplies',
  tables: [suppliesTable],
  apis: ['GET::/supplies', 'POST::/supplies/create', 'GET::/currency'],
};
