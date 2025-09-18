export const dashboard = {
  sectionId: 'dashboardSection',
  title: 'Дашборд',
  url: '/dashboard',
  tables: [],
  apis: [
    'GET::/orders/active',
    'GET::/orders/revenue',
    'GET::/tasks/active',
    'GET::/client',
  ],
};
