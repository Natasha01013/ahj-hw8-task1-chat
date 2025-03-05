// Класс для входа и отправки сообщений
export class ChatUI {
    constructor() {
      this.sendButton = document.getElementById('send-button'); //Используем в классе Chat
      this.exitButton = document.getElementById('exit-button'); //Используем в классе Chat
      this.nicknameInput = document.getElementById('nickname-input');//Используем в классе Chat
      this.nicknameSubmitButton = document.getElementById('nickname-submit'); //Используем в классе Chat
      this.messageInput = document.getElementById('message-input'); // Поле для ввода сообщения
    }
  
    // Открытие модального окна для ввода никнейма
    openNicknameModal() {
      const nicknameModal = document.getElementById('nickname-modal');
      nicknameModal.style.display = 'flex'; // Показываем модальное окно
    }
  
    // Закрытие модального окна
    closeNicknameModal() {
      const nicknameModal = document.getElementById('nickname-modal');
      nicknameModal.style.display = 'none';
    }
  
    // Обновление списка пользователей
    updateUserList(users, currentUser) {
      const userList = document.getElementById('user-list');
      userList.innerHTML = ''; // Очищаем текущий список пользователей
      users.forEach((user) => {
        const li = document.createElement('li');
        li.textContent = `${user.name} ${user.name === currentUser ? '(You)' : ''}`;
        userList.appendChild(li);// Добавляем нового пользователя в список
      });
    }
  
    // Отображение сообщений
    appendMessage(message, isOwnMessage) {
      const messagesContainer = document.getElementById('messages');
      const messageElement = document.createElement('div');
      messageElement.classList.add('message');
      if (isOwnMessage) {
        messageElement.classList.add('own');
        messageElement.textContent = `You: ${message.message}`;  // Меняем никнейм на "You"
      } else {
        messageElement.textContent = `${message.user.name}: ${message.message}`;
      }
      messagesContainer.appendChild(messageElement);
      messagesContainer.scrollTop = messagesContainer.scrollHeight; // Прокручиваем чат вниз
  }
  
    // Очистка поля ввода сообщения
    clearMessageInput() {
      this.messageInput.value = '';
    }
  }