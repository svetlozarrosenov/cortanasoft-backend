import { locationsTable } from '../../front-end/tables/locations';

export const locations = {
  sectionId: 'locationsSection',
  title: 'Локации',
  icon: 'FaMapMarkerAlt',
  url: '/dashboard/locations',
  tables: [locationsTable],
  apis: [
    'GET::/locations',
    'POST::/locations/create',
    'PUT::/locations/update/:id',
    'DELETE::/locations/delete/:id',
  ],
};
