import { companiesTable } from '../../front-end/tables/companies';

export const companies = {
  sectionId: 'companiesSection',
  title: 'Компании',
  url: '/dashboard/companies',
  tables: [companiesTable],
  apis: ['GET:: companies'],
};
