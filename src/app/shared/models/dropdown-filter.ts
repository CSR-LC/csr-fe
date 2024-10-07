import { DropdownFilterOption } from '@shared/models/dropdown-filter-option';

export interface DropdownFilter {
  id: string;
  label: string;
  options: DropdownFilterOption[];
}
