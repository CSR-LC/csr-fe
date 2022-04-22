export type Kind = {
    id: number,
    max_reservation_time: number,
    max_reservation_units: number,
    name: string,
}

export type EquipmentManagement = {
    description: string,
    kind: number,
    location: number,
    name: string,
    photo: string,
    rate_day: number,
    rate_hour: number,
    sku: string,
    status: number,
}