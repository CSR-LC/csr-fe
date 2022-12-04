export enum NotificationTypes {
  Warning = 'warning',
  Error = 'error',
  Success = 'success',
}

export enum NotificationMessages {
  //error
  EquipmentFormInvalid = 'Регистрация нового оборудования невозможна. Необходимо заполнить все обязательные поля.',
  InventoryNumberExistst = 'Оборудование с таким инвентарным номером уже существует. Для продолжения регистрации необходимо ввести другой инвентарный номер.',
  //warning

  //success
  Authorized = 'Авторизация прошла упешно.',
  EquipmentFormSubmitSuccess = 'Оборудование зарегистрировано успешно',
}
