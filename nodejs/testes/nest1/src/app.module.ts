import { Module } from '@nestjs/common';
import { CatsModule } from './cats/cats.module';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';

@Module({
  imports: [CatsModule, UsersModule],
  controllers: [AppController],
  providers: [AppService, UsersService],
})
export class AppModule {}
