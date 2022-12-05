import { Category } from '../models/categories';

export class GetCategories {
  static readonly type = '[Categories] Get';
  constructor(public categories: Category[]) {}
}
