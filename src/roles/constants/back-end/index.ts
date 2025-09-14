import { clients } from './clients';
import { companies } from './companies';
import { dashboard } from './dashboard';
import { locations } from './locations';
import { orders } from './orders';
import { products } from './products';
import { suppliers } from './suppliers';
import { supplies } from './supplies';
import { tasks } from './tasks';

export const permissions = [].concat(
  dashboard,
  tasks,
  clients,
  orders,
  products,
  locations,
  suppliers,
  supplies,
  companies,
);
