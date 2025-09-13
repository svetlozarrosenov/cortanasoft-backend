import { clients } from './clients';
import { dashboard } from './dashboard';
import { locations } from './locations';
import { orders } from './orders';
import { products } from './products';
import { suppliers } from './suppliers';
import { supplies } from './supplies';
import { tasks } from './tasks';

export const permissions = [].concat(
  tasks,
  clients,
  dashboard,
  orders,
  locations,
  products,
  suppliers,
  supplies,
);
