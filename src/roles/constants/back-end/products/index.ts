import { productsListTable } from '../../front-end/tables/products/products-list';
import { productsLotsTable } from '../../front-end/tables/products/products-lots';

export const products = {
  sectionId: 'productsSection',
  title: 'Продукти',
  icon: 'FaBox',
  url: '/dashboard/products',
  tables: [],
  apis: [],
  children: [
    {
      sectionId: 'productsListSection',
      title: 'Видове Продукти',
      url: '/dashboard/products/all',
      tables: [productsListTable],
      apis: [
        'GET::/products',
        'PUT::/products/update/:id',
        'POST::/products/create',
      ],
    },
    {
      sectionId: 'productsLotsSection',
      title: 'Партиди',
      url: '/dashboard/products/lots',
      tables: [productsLotsTable],
      apis: ['GET::/lots', 'POST::/lots/create'],
    },
  ],
};
