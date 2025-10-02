import { companiesTable } from '../../front-end/tables/companies';
import { rolesTable } from '../../front-end/tables/companies/roles-table';
import { usersTable } from '../../front-end/tables/companies/users-table';

export const companies = {
  sectionId: 'companiesSection',
  title: 'Компании',
  icon: 'FaBuilding',
  url: '/dashboard/companies',
  tables: [companiesTable, usersTable, rolesTable],
  apis: [
    'GET::/company',
    'GET::/roles/company/:id',
    'GET::/roles/permissions',
    'PUT::/roles/update/:id',
    'POST::/roles/create',
    'DELETE::/roles/delete/:id',
  ],
};
