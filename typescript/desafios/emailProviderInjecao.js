var EmailService = /** @class */ (function () {
    function EmailService() {
    }
    EmailService.prototype.sendEmail = function (nome, message) {
        console.log("Email enviado para ".concat(nome));
        console.log(message);
    };
    return EmailService;
}());
var NotificationEmail = /** @class */ (function () {
    function NotificationEmail(emailProvider) {
        this.emailProvider = emailProvider;
    }
    NotificationEmail.prototype.notify = function (nome, message) {
        this.emailProvider.sendEmail(nome, message);
    };
    return NotificationEmail;
}());
var emailService = new EmailService();
var notification = new NotificationEmail(emailService);
notification.notify("Goku", "Olá eu sou o Goku!");
// mais
var FakeEmailService = /** @class */ (function () {
    function FakeEmailService() {
    }
    FakeEmailService.prototype.sendEmail = function (nome, message) {
        console.log("Fake email enviado: ", nome);
        console.log(message);
    };
    return FakeEmailService;
}());
var fakeService = new FakeEmailService();
var notificationFake = new NotificationEmail(fakeService);
notificationFake.notify("Naruto", "Eu vou ser Hokage TO CERTO!!!");
