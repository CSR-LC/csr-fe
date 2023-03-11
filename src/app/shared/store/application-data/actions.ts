import { BaseKind, PetSize } from '@app/management/models/management';

export class PetKindsAction {
  static readonly type = '[Application data] PetKindsAction';
  constructor(public petKinds: BaseKind[]) {}
}

export class PetSizesAction {
  static readonly type = '[Application data] PetSizes';
  constructor(public petSizes: PetSize[]) {}
}
