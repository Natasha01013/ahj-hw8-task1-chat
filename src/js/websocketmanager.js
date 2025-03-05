export class WebSocketManager {
    constructor(url, onMessage, onOpen, onClose, onError) {
      this.socket = new WebSocket(url); //создаем новое WebSocket-соединение, подключаемся к серверу по указанному url
      this.onMessage = onMessage;//Функция, которая будет обрабатывать события onmessage (получение сообщения от сервера)
      this.onOpen = onOpen; //Функция, которая будет обрабатывать событие onopen (успешное открытие соединения)
      this.onClose = onClose; //Функция, которая будет обрабатывать событие onclose (закрытие соединения)
      this.onError = onError; //Функция, которая будет обрабатывать событие onerror (ошибки WebSocket-соединения)
  
      this.socket.onopen = this.onOpen; //Устанавливаем обработчик события onopen, который будет вызван, когда WebSocket-соединение успешно откроется
      this.socket.onmessage = this.onMessage; //Обработчик события onmessage будет вызван, когда сервер отправит сообщение
      this.socket.onclose = this.onClose;//Обработчик события onclose будет вызван, когда WebSocket-соединение закроется
      this.socket.onerror = this.onError;//Обработчик события onerror будет вызван, если возникнет ошибка при работе с WebSocket.
    }
  
    //Метод для отправки сообщения на сервер через WebSocket-соединение
    sendMessage(message) {
      if (this.socket.readyState === WebSocket.OPEN) { //Если соединение с сервером установлено, и готово к обмену данными
        this.socket.send(JSON.stringify(message));// Данные отправятся, преобразуясь в строку в формате JSON
      }
    }
  
    //Метод для закрытия WebSocket-соединения
    close() {
      this.socket.close();
    }
  }