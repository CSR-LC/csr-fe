import { Equipment } from '@app/catalog/models/equipment';

export const EquipmentMock: Equipment[] = [
  {
    category: 1,
    compensationCost: 1,
    condition: 'Condition',
    description: 'Description',
    inventoryNumber: 1,
    id: 1,
    kind: 1,
    location: null,
    maximumAmount: 1,
    maximumDays: 30,
    name: 'Leo Factory z100',
    name_substring: 'Клетка для кошек 76*53*61',
    order: 1,
    photo: 'photo.jpg',
    photoID: 'photo.jpg',
    receiptDate: 'receiptDate',
    status: 1,
    supplier: 'supplier',
    title: 'title',
    technicalIssues: false,
  },
  {
    category: 2,
    compensationCost: 2,
    condition: 'Condition',
    description: 'Description',
    inventoryNumber: 2,
    id: 2,
    kind: 2,
    location: null,
    maximumAmount: 1,
    maximumDays: 30,
    name: 'Leo Factory z200',
    name_substring: 'Клетка для кошек 91*61*71',
    order: 1,
    photo: 'photo.jpg',
    photoID: 'photo.jpg',
    receiptDate: 'receiptDate',
    status: 1,
    supplier: 'supplier',
    title: 'title',
    technicalIssues: false,
  },
];
