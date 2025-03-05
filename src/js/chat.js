import {WebSocketManager} from '../js/websocketmanager.js';
import {UserManager} from '../js/usermanager.js';
import {ChatUI} from '../js/chatui.js';

export class Chat {
    constructor() {
      this.webSocketManager = new WebSocketManager(
        'ws://ahj-hw8-task1-chat-backend.onrender.com', // Протокол для WebSocket на сайте render.com
        (event) => this.onSocketMessage(event), // Обработчик сообщений
        () => this.onSocketOpen(), // Обработчик открытия соединения
        () => this.onSocketClose(), // Обработчик закрытия соединения
        (error) => this.onSocketError(error) // Обработчик ошибок
      );
      
      this.userManager = new UserManager(); // Класс для создания пользователя
      this.chatUI = new ChatUI(); // Класс для входа и отправки сообщений
  
      this.chatUI.nicknameSubmitButton.addEventListener('click', () => this.submitNickname()); //Кнопка "продолжить"
      this.chatUI.sendButton.addEventListener('click', () => this.sendMessage());// Кнопка "отправить"
      this.chatUI.exitButton.addEventListener('click', () => this.exitChat()); // Кнопка "выйти"
    }
  
    // Обработка открытия WebSocket-соединения
    onSocketOpen() {
      console.log('Подключено к WebSocket серверу');
      this.chatUI.openNicknameModal(); // Открытие модального окна для ввода никнейма
    }
  
    // Обработка сообщений от сервера
    onSocketMessage(event) {
      const data = JSON.parse(event.data);
  
      if (Array.isArray(data)) {
        // Если это список пользователей
        this.chatUI.updateUserList(data, this.userManager.getUserName()); // Обновление списка пользователей
        console.log("Updated user list received:", data);
      } else {
        // Если это сообщение, отображаем его в чате
        const isOwnMessage = data.user.name === this.userManager.getUserName();
        this.chatUI.appendMessage(data, isOwnMessage); // Отображение сообщений
      }
    }
  
    // Обработка закрытия WebSocket-соединения
    onSocketClose() {
      console.log('Отключено от WebSocket сервера');
    }
  
    // Обработка ошибок WebSocket
    onSocketError(error) {
      console.error('Ошибка WebSocket:', error);
    }
  
    // Отправка никнейма на сервер
    submitNickname() {
      const nickname = this.chatUI.nicknameInput.value.trim();
      if (nickname) {
        this.userManager.createUser( //Cоздание нового пользователя
          nickname,
          () => {
            this.chatUI.closeNicknameModal();// Закрытие модального окна
            console.log('Никнейм успешно зарегистрирован');
          },
          (errorMessage) => alert(errorMessage)
        );
      }
    }
  
    // Отправка сообщения
    sendMessage() {
      const message = this.chatUI.messageInput.value.trim();
      if (message && this.userManager.isUserConnected()) {//Если пользователь есть (не пустое поле) и он подключен
        const msg = { //Создается объект msg
          type: 'send', //Тип - отправка
          message: message, //Текст сообщения
          user: { name: this.userManager.getUserName() }, //Имя пользователя, который отправляет сообщение
        };
        this.webSocketManager.sendMessage(msg); //Отправляем созданный объект msg через WebSocket-соединение
        this.chatUI.clearMessageInput(); //Очищаем поле ввода сообщений
      }
    }
  
    // Выход из чата
    exitChat() {
      if (this.userManager.isUserConnected()) { //Если пользователь подключен
        const msg = { //Создаем объект msg, который будет отправлен через WebSocket-соединение
          type: 'exit', //Тип - выход из чата
          user: { name: this.userManager.getUserName() }, //Имя пользователя, который выходит
        };
        this.webSocketManager.sendMessage(msg); //Отправляем сообщение на сервер через WebSocket о выходе пользователя
        this.webSocketManager.close(); //Закрываем WebSocket-соединение, разрывая связь с сервером
      }
    }
  }