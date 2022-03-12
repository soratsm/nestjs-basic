import { Injectable } from '@nestjs/common';
import { Cat } from './interfaces/cat.interface';

// サービスはデータの保存と取得を担当
// 責務を分離して疎結合させる
// cmd:nest g service cats

@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [];

  create(cat: Cat) {
    this.cats.push(cat);
  }

  findAll(): Cat[] {
    return this.cats;
  }
}
