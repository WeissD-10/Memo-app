import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMemoDto, MemoDto } from 'src/dtos/memo-dto';
import  md5 = require('md5');

@Injectable()
export class MemoService {
  memoStorage = new Array<MemoDto>();

  getMemos(): MemoDto[] {
    return this.memoStorage;
  }

  getMemoById(id: string): MemoDto {
    const foundMemo = this.findMemoById(id);
    if (foundMemo) {
      return foundMemo;
    }
    throw new NotFoundException(`memo with id ${id} not found`);
  }
  /**
   * creates memo with id
   * @param memo data of the memo to be created as CreateMemoDto
   * @returns the created memo
   */
  createMemo(memo: CreateMemoDto): MemoDto {
    const createMemo = memo as MemoDto;
    createMemo.id = this.createMemoId(createMemo);
    this.memoStorage.push(createMemo);
    return createMemo;
  }
  updateMemo(memo: MemoDto): MemoDto {
    const findMemo = this.findMemoById(memo.id);
    const index = this.memoStorage.indexOf(findMemo);
    if (findMemo) {
      this.memoStorage[index] = memo;
      return memo;
    }
    throw new NotFoundException(`memo Object to be updated not found`);
  }
  deleteMemo(id: string): MemoDto {
    const memo = this.findMemoById(id);
    const index = this.memoStorage.indexOf(memo);
    if (index > -1) {
      this.memoStorage.splice(index, 1);
      return memo;
    }
    throw new NotFoundException(`memo with id ${id} not found`);
  }
  /**
   * searches for a memo by id, in this usecase it wouldn't be necessary to separate the function
   * @param id id of the memo
   * @returns memoDto of the searched memo or undefined
   */
  private findMemoById(id: string): MemoDto | undefined {
    return this.memoStorage.find((e) => e.id === id);
  }
  /**
   * Creates a somewhat unique id for the memo by using the memo itself and currentdate in MS
   * @param memo full memo DTO with empty ID
   * @returns memo ID
   */
  private createMemoId(memo: MemoDto) {
    const currentDate = Date.now().toString();
    return (memo.id = md5(JSON.stringify(memo).concat(currentDate)));
  }
}
