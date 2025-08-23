import { Injectable } from '@nestjs/common';
import { SigninDTO, SignupDTO } from './dtos/auth';

@Injectable()
export class AuthService {
  signup(data: SignupDTO) {
    console.log({ data });
    return 'signup';
  }

  signin(data: SigninDTO) {
    console.log({ data });
    return 'signin';
  }
}
