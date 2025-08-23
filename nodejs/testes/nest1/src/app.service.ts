import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  cadastro(name: string, email: string): string {
    return `<h1>nome: ${name} email: ${email}</h1>`;
  }
}
