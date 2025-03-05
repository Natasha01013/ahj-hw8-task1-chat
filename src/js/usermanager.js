// Класс для создания пользователя
export class UserManager {
    constructor() {
        this.userName = ''; // Имя пользователя
        this.isConnected = false; // Состояние подключения
    }

  // Запрос на создание нового пользователя
  createUser(name, onSuccess, onError) {
    fetch('http://localhost:3000/new-user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name }),
    })
      .then((response) => response.json())  //Ответ в формате JSON
      .then((data) => {
        if (data.status === 'ok') {
          this.userName = data.user.name; //Присвоим значение имени пользователя, которое пришло в объекте data
          this.isConnected = true; //Пользователь успешно подключен
          onSuccess();
        } else {
          onError('Никнейм уже занят, выберите другой');
        }
      })
      .catch(() => onError('Ошибка при регистрации никнейма.'));
  }

  //Получаем имя пользователя
  getUserName() {
    return this.userName;
  }

  //Состояние подключения пользователя
  isUserConnected() {
    return this.isConnected;
  }
}