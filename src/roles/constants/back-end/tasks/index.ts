import { tasksTable } from '../../front-end/tables/tasks';

export const tasks = {
  sectionId: 'tasksSection',
  title: 'Задачи',
  icon: 'FaTasks',
  url: '/dashboard/tasks',
  tables: [tasksTable],
  apis: [
    'GET::/tasks',
    'GET::/tasks/:id',
    'POST::/tasks/create',
    'PUT::/tasks/update/:id',
    'PUT::/tasks/:id/comment/create',
  ],
};
