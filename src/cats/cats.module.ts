import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

// サービスとルーティングも分離させる
// cmd:nest g module cats

// DB接続などどこでも利用可能としたい場合は下記書き方もあり（importしなくていい）
// ただしあまり使用しないほうがいい（責務分離の意味がなくなる）
// @Global()

@Module({
  controllers: [CatsController],
  providers: [CatsService],
  // exportすれば下記のように書いてサービスのみ再利用も可能
  // imports: [CatsService],
  exports: [CatsService],
})
export class CatsModule {}
