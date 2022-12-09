import { Category } from '../models';

export class GetCategories {
  static readonly type = '[Categories] Get';
  constructor(public categories: Category[]) {}
}
