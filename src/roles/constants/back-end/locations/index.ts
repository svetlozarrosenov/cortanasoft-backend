import { locationsTable } from '../../front-end/tables/locations';

export const locations = {
  sectionId: 'locationsSection',
  title: 'Локации',
  url: '/dashboard/locations',
  tables: [locationsTable],
  apis: ['GET:: locations'],
};
