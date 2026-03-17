interface EmailProvider {
  sendEmail(nome: string, message: string): void
}

class EmailService implements EmailProvider {
  sendEmail(nome: string, message: string): void {
    console.log(`Email enviado para ${nome}`)
    console.log(message)
  }
}

class NotificationEmail {
  constructor(private emailProvider: EmailProvider) {}

  notify(nome: string, message: string): void {
    this.emailProvider.sendEmail(nome, message)
  }
}

const emailService = new EmailService()
const notification = new NotificationEmail(emailService)

notification.notify("Goku", "Olá eu sou o Goku!") 

// mais

class FakeEmailService implements EmailProvider {
  sendEmail(nome: string, message: string): void {
    console.log("Fake email enviado: ", nome)
    console.log(message)
    
  }
}

const fakeService = new FakeEmailService()
const notificationFake = new NotificationEmail(fakeService)

notificationFake.notify("Naruto", "Eu vou ser Hokage TO CERTO!!!")  