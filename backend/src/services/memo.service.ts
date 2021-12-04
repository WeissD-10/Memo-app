import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMemoDto, MemoDto } from 'src/dtos/memo-dto';

var md5 = require('md5');

const memoStorage = new Array<MemoDto>();

@Injectable()
export class MemoService {
  getMemos(): MemoDto[]{
    return memoStorage;
  }

  getMemoById(id: string): MemoDto {
    const foundMemo = this.findMemoById(id);
    if(foundMemo) {
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
    memoStorage.push(createMemo);
    return createMemo;
  }
  updateMemo(memo: MemoDto): MemoDto {
    const findMemo = this.findMemoById(memo.id);
    let index = memoStorage.indexOf(findMemo);
    if(findMemo) {
      memoStorage[index] = memo;
      return memo
    }
    throw new NotFoundException(`memo Object to be updated not found`);
  }
  deleteMemo(id: string): MemoDto {
    const memo = this.findMemoById(id);
    const index = memoStorage.indexOf(memo);
    if(index > -1 ) {
      memoStorage.splice(index, 1);
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
    return memoStorage.find(e => e.id === id);
  }
  /**
   * Creates a somewhat unique id for the memo by using the memo itself and currentdate in MS
   * @param memo full memo DTO with empty ID
   * @returns memo ID
   */
  private createMemoId(memo: MemoDto) {
    const currentDate = Date.now().toString();
    return memo.id = md5(JSON.stringify(memo).concat(currentDate));
  }
}
