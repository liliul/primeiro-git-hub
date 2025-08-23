import { Body, Controller, Post } from '@nestjs/common';
import type { SigninDTO, SignupDTO } from './dtos/auth';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signup(@Body() body: SignupDTO) {
    this.authService.signup(body);
    return body;
  }

  @Post('signin')
  signin(@Body() body: SigninDTO) {
    this.authService.signin(body);
    return body;
  }
}
