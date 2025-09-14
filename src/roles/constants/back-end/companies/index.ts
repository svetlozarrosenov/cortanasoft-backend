import { companiesTable } from '../../front-end/tables/companies';
import { rolesTable } from '../../front-end/tables/companies/roles-table';
import { usersTable } from '../../front-end/tables/companies/users-table';

export const companies = {
  sectionId: 'companiesSection',
  title: 'Компании',
  url: '/dashboard/companies',
  tables: [companiesTable, usersTable, rolesTable],
  apis: ['GET:: companies'],
};
