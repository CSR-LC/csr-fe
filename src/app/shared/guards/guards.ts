import { TokensGuard } from '@shared/guards/tokens.guard';
import { AuthGuard } from '@shared/guards/auth.guard';

export const guards = [TokensGuard, AuthGuard];
