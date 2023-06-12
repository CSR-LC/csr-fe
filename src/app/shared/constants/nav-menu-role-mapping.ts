import { NavigationLink } from '../types/navigation-link';
import { UserRole } from './user-role.enum';

const defaultRoutes: NavigationLink[] = [
  {
    name: 'Каталог',
    route: 'catalog/categories',
  },
  {
    name: 'Профиль',
    route: 'profile',
  },
  {
    name: 'Мои заявки',
    route: 'profile/requests',
  },
];

const adminRoutes = [
  {
    name: 'Admin',
    route: 'categories',
  },
  {
    name: 'Профиль',
    route: 'profile',
  },
  {
    name: 'Мои заявки',
    route: 'profile/requests',
  },
];

export const navLinksMap = new Map([
  [UserRole.default, defaultRoutes],
  [UserRole.admin, adminRoutes],
  [UserRole.manager, adminRoutes],
]);
