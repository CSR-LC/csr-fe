import { TokensGuard } from '@shared/guards/tokens.guard';
import { AuthGuard } from '@shared/guards/auth.guard';
import { AdminGuard } from './admin.guard';

export const guards = [TokensGuard, AuthGuard, AdminGuard];
