import { DropdownFilter } from '@shared/models/dropdown-filter';
import { Observable } from 'rxjs';

export interface DropdownFilterProvider {
  getId(): string;

  getFilter(): Observable<DropdownFilter>;
}
