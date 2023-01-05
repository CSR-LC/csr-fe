export type FilterValue = {
  petKinds: number[];
  petSize: number[];
  technicalIssues: boolean;
};

export type FilterData = {
  filterValue: FilterValue;
};

export interface BaseKind {
  id: number;
  name: string;
}

export interface PetSize extends BaseKind {
  size: string;
  is_universal: boolean;
}
