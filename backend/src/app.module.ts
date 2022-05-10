import { Module } from '@nestjs/common';
import { MemoController } from './controllers/memo.controller';
import { MemoService } from './services/memo.service';

@Module({
  imports: [],
  controllers: [MemoController],
  providers: [MemoService],
})
export class AppModule {}
