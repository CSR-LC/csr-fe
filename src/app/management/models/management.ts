export type Kind = {
    id: number,
    max_reservation_time: number,
    max_reservation_units: number,
    name: string,
}

export type EquipmentManagement = {
    category: string,
    subCategory: string,
    compensationCost: number,
    healthStatus: string,
    inventoryNumber: string,
    supplier: string,
    receiptDate: Date,
    termsOfUse: string,
}