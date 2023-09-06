import { TokensGuard } from '@shared/guards/tokens.guard';
import { AuthGuard } from '@shared/guards/auth.guard';
import { AdminGuard } from './admin.guard';
import { EmailGuard } from './email.guerd';
import { ConfirmedEmail } from './confirmed-email.gueard';

export const guards = [TokensGuard, AuthGuard, AdminGuard, EmailGuard, ConfirmedEmail];
