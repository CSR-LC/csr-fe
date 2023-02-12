import { BaseKind } from './base-kind';

export interface PetSize extends BaseKind {
  size: string;
  is_universal: boolean;
}
