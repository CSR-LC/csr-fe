export type Kind = {
    id: number,
    max_reservation_time: number,
    max_reservation_units: number,
    name: string,
}

export type EquipmentManagement = {
    name: string,
    description: string,
    nameSubstring: string,
    category: string,
    subCategory: string,
    // TODO: remove russian C in Cost
    compensationСost: number,
    condition: string,
    inventoryNumber: number,
    supplier: string,
    receiptDate: string,
    termsOfUse: string,
    kind: number,
    location: number,
    maximumAmount: number,
    maximumDays: number,
    order: number,
    status: number,
    photo: string,
}