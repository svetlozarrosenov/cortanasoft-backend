export const dashboard = {
  sectionId: 'dashboardSection',
  icon: 'FaTachometerAlt',
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
