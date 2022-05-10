import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
  Logger,
} from '@nestjs/common';
import { CreateMemoDto, MemoDto } from 'src/dtos/memo-dto';
import { ClassValidationPipe } from 'src/middleware/validation.pipe';
import { MemoService } from 'src/services/memo.service';

@Controller('memo')
export class MemoController {
  private readonly logger = new Logger(MemoController.name);
  constructor(private readonly memoService: MemoService) {}
  @Get()
  getAll(): MemoDto[] {
    this.logger.log('Getting Memos');
    return this.memoService.getMemos();
  }
  @Get(':id')
  getById(@Param('id') params): MemoDto {
    this.logger.log('Getting Memo by ID');
    return this.memoService.getMemoById(params.id);
  }
  @Post()
  create(@Body(new ClassValidationPipe()) memo: CreateMemoDto): MemoDto {
    this.logger.log('Creating Memo');
    return this.memoService.createMemo(memo);
  }
  @Put()
  update(@Body(new ClassValidationPipe()) memo: MemoDto): MemoDto {
    this.logger.log('Update Memo');
    return this.memoService.updateMemo(memo);
  }
  @Delete(':id')
  delete(@Param('id') params): MemoDto {
    this.logger.log('Deleting Memo');
    return this.memoService.deleteMemo(params);
  }
}
