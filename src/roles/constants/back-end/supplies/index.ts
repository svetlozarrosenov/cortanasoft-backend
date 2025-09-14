import { suppliesTable } from '../../front-end/tables/supplies';

export const supplies = {
  sectionId: 'suppliesSection',
  title: 'Доставки',
  url: '/dashboard/supplies',
  tables: [suppliesTable],
  apis: ['GET:: supplies'],
};
