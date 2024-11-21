import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookModule } from './book/book.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    BookModule,
    MongooseModule.forRoot(process.env.MONGO_URI, {
      retryAttempts: 5, // Retry connection on failure
      retryDelay: 3000, // 3 seconds delay between retries
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
