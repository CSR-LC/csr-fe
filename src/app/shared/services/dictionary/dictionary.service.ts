import { Injectable } from '@angular/core';
import { Dictionary, ItemTranslated } from '@app/shared/types';

@Injectable({
  providedIn: 'root',
})
export class DictionaryService {
  createDictionary(items: ItemTranslated[], dictionary: Dictionary<string>) {
    items.forEach((item) => (dictionary[item.id] = item.translation || item.name));
  }

  getDictionaryValue<T>(dictionary: Dictionary<T>, key: string | number): T | undefined {
    const value = dictionary[key];
    return value ? value : undefined;
  }
}
