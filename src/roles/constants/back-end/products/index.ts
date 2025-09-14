import { productsListTable } from '../../front-end/tables/products/products-list';
import { productsLotsTable } from '../../front-end/tables/products/products-lots';

export const products = {
  sectionId: 'productsSection',
  title: 'Продукти',
  url: '/dashboard/products',
  tables: [],
  apis: ['GET:: products'],
  children: [
    {
      sectionId: 'productsListSection',
      title: 'Видове Продукти',
      url: '/dashboard/products/all',
      tables: [productsListTable],
      apis: ['GET:: products'],
    },
    {
      sectionId: 'productsLotsSection',
      title: 'Партиди',
      url: '/dashboard/products/lots',
      tables: [productsLotsTable],
      apis: ['GET:: products'],
    },
  ],
};
