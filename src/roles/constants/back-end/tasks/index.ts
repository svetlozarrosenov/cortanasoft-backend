import { tasksTable } from '../../front-end/tables/tasks';

export const tasks = {
  sectionId: 'tasksSection',
  title: 'Задачи',
  url: '/dashboard/tasks',
  tables: [tasksTable],
  apis: ['GET::/tasks', 'POST::/tasks/create', 'PUT::/tasks/update/:id'],
};
