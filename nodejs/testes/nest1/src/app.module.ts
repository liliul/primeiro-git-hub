import { Module } from '@nestjs/common';
import { CatsModule } from './cats/cats.module';
import { AppService } from './app.service';
import { AppController } from './app.controller';

@Module({
  imports: [CatsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
