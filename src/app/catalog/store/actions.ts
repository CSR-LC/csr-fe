import { Equipment } from '../models/equipment';

export class GetCatalog {
  static readonly type = '[Catalog] Get';
  constructor(public catalog: Equipment[]) {}
}
