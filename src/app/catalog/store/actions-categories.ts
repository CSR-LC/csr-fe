import { Categories } from '../models/categories';

export class GetCategories {
  static readonly type = '[Categories] Get';
  constructor(public categories: Categories[]) {}
}
