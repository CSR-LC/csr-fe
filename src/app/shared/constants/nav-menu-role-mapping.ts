import { NavigationLink } from '../types/navigation-link';
import { AppRoutes } from './routes.enum';
import { UserRole } from './user-role.enum';

const userRoutes: NavigationLink[] = [
  {
    name: 'Каталог',
    route: AppRoutes.Catalog,
  },
  {
    name: 'Профиль',
    route: AppRoutes.Profile,
  },
  {
    name: 'Мои заявки',
    route: 'profile/requests', //TBD
  },
];

const adminRoutes = [
  {
    name: 'Роли',
    route: 'roles', //TBD
  },
  {
    name: 'Пользователи',
    route: AppRoutes.Users,
  },
  {
    name: 'Оборудование',
    route: AppRoutes.Equipments,
  },
];

export const navLinksMap = new Map([
  [UserRole.user, userRoutes],
  [UserRole.admin, adminRoutes],
  [UserRole.manager, adminRoutes],
  [UserRole.operator, adminRoutes],
]);
