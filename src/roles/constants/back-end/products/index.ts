import { productsCategoriesListTable } from '../../front-end/tables/products/categories-list';
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
      sectionId: 'productsCategoriesListSection',
      title: 'Категории',
      url: '/dashboard/products/categories',
      tables: [productsCategoriesListTable],
      apis: [
        'GET::/products/categories',
        'POST::/products/categories/create',
        'PUT::/products/categories/update/:id',
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
