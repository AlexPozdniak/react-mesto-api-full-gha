const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled', // класс заблокированной кнопки
  inputErrorClass: 'popup__input_type_error', // класс невалидного инпута ( __ red)
  errorClass: 'popup__error_visible', // visibility: visible у ошибки
  errorElement: '.popup__input-error' // span ошибки
}

const API_CONFIG = {
  token: 'e253ca36-1fab-496f-8fe5-7eb3f8a75878',
  group: 'cohort-68',
  url: 'https://mesto.nomoreparties.co/v1/',
  authUrl: 'https://auth.nomoreparties.co',
}

export { config, API_CONFIG }
