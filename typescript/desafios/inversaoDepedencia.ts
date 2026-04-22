export interface NotificationService {
  send(message: string): void;
}

export class EmailService implements NotificationService {
  send(message: string): void {
    console.log("Email:", message);
  }
}

export class SmsService implements NotificationService {
  send(message: string): void {
    console.log("SMS:", message);
  }
}

export class UserController {
  constructor(private notificationService: NotificationService) {}

  registerUser(user: string): void {
    console.log("Usuário:", user);
    this.notificationService.send("Bem-vindo!");
  }
}

const service = new EmailService();
const controller = new UserController(service);
controller.registerUser("Naruto Uzumaki");
