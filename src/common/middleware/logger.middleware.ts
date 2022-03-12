import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

/**
ミドルウェアは以下の仕事を遂行する。

  * あらゆるコードの実行
  * リクエスト、レスポンスオブジェクトの変更
  * リクエスト-レスポンスサイクルの終了
  * スタック内の次のミドルウェアを呼び出す。
  * 現在のミドルウェアがリクエスト-レスポンスサイクルを終了しない場合、次のミドルウェアに制御を渡す為にnext()を呼ぶ必要がある。呼ばなければ、リクエストはハングアップする。

カスタムミドルウェアは関数か@injectable()デコレータ持ちのクラスによって実装する。クラスはNestMiddlewareインターフェイスを実装する必要があるものの、関数に特別な要件はない。まずはクラスメソッドを使いシンプルなミドルウェアを作成しよう。
 */

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('Request...');
    next();
  }
}
