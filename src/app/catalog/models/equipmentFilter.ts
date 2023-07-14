export type EquipmentFilter = {
  category: number;
  petKinds?: number[];
  petSize?: number[];
  name_substring?: string;
  technicalIssues?: boolean;
};

export type EquipmentFilterFormModel = {
  idealCondition: boolean;
  petKinds: boolean[];
  petSizes: boolean[];
};
