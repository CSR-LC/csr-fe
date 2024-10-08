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
    route: AppRoutes.MyApplications,
  },
];

const adminRoutes: NavigationLink[] = [
  {
    name: 'Роли',
    route: `${AppRoutes.Admin}/${AppRoutes.Roles}`, //TBD
  },
  {
    name: 'Пользователи',
    route: `${AppRoutes.Admin}/${AppRoutes.Users}`,
  },
  {
    name: 'Оборудование',
    route: `${AppRoutes.Admin}/${AppRoutes.Equipments}`,
  },
  {
    name: 'Заявки',
    route: `${AppRoutes.Admin}/${AppRoutes.Applications}`,
  },
];

export const navLinksMap = new Map([
  [UserRole.user, userRoutes],
  [UserRole.admin, adminRoutes],
  [UserRole.manager, adminRoutes],
  [UserRole.operator, adminRoutes],
]);
