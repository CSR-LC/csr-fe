export const notificationMessages: { [key: string]: string } = {
  'invalid login or password': 'Неправильный логин или пароль.',
  'login is already used':
    'Пользователь с таким адресом электронной почты уже существует. Используйте другую почту или восстановите пароль.',
  'requested equipment is not free': 'Оборудование недоступно в выбранный период. Попробуйте снова.',
  'Failed to verify confirmation token. Please try again later': 'Не удалось подтвердить почту.',
  'error while updating readonly access': 'Пользователь не был заблокирован/разблокирован',
  "can't send link for confirmation new email":
    'Не удалось отправить ссылку для подтверждения нового адреса электронной почты',
  default: 'К сожалению произошла ошибка. Попробуйте действие еще раз.',
};
