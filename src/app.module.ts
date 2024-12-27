import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthorModule } from './author/author.module';
import { BookModule } from './book/book.module';
import { TestModule } from './test/test.module';

@Module({
  imports: [AuthorModule, BookModule, TestModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
