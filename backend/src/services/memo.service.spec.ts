import { Test, TestingModule } from '@nestjs/testing';
import { CreateMemoDto, MemoDto } from 'src/dtos/memo-dto';
import { MemoService } from './memo.service';

describe('AppController', () => {
    let memoService: MemoService;
    let currentDate = new Date().toISOString();

    const mockCreateMemo: CreateMemoDto = {
        title: "Test",
        author: "ich",
        text: "das ist ein Test",
        date: currentDate
    }  

    beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
        providers: [MemoService],
    }).compile();

    memoService = app.get<MemoService>(MemoService);
    });

    describe('root', () => {
    it('should create a memo', () => {
        const memo = mockCreateMemo as MemoDto;
        const createdMemo = memoService.createMemo(memo);
        memo.id = createdMemo.id;
        expect(createdMemo.id.length).toBe(32);
        expect(createdMemo).toBe(memo);
    });
    });


});
