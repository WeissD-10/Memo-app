import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateMemoDto, MemoDto } from 'src/dtos/memo-dto';
import { MemoService } from './memo.service';

describe('AppController', () => {
    let memoService: MemoService;
    let currentDate = new Date().toISOString();
    let memos: MemoDto[]
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
    memos = [...Array(50).keys()].map((value) => createMockMemo(value));
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
    it('should get all memos', () => {
        memoService.memoStorage = memos;
        expect(memoService.getMemos()).toBe(memos);
    });
    it('should get memoById', () => {
        memoService.memoStorage = memos;
        expect(memoService.getMemoById('2')).toBe(memos[2]);
    });
    it('should update memo', () => {
        memoService.memoStorage = memos;
        let memo = {...memos[5]};
        memo.author = 'test  ha ha';
        expect(memoService.updateMemo(memo)).toBe(memoService.memoStorage[5]);
    });
    it('should delete memo', () => {
        memoService.memoStorage = [...memos];
        let memo = memos[10];
        expect(memoService.deleteMemo(memo.id)).toBe(memos[10]);
        expect(memoService.memoStorage[10].id).toBe('11');
        expect(memoService.memoStorage.length).toBe(49);
    });
    it('should throw an error if id is unknown', () => {
        memoService.memoStorage = memos;
        let memo = {...memos[5]};
        memo.id = 'test666';
        memo.date = 'test';
        expect(() => {
            memoService.updateMemo(memo)
        }).toThrow(new NotFoundException(`memo Object to be updated not found`));
    })
    
});
    function createMockMemo(val: number): MemoDto {
        return {id: val.toString(), text: `${val} 12343`, date: new Date(val * 100000).toISOString(), title: 'ich', author: 'ich' };
    }
