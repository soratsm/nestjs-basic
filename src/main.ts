import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// セキュリティ関連のヘッダー情報をいい感じにしてくれる
import helmet from 'helmet';

// [nest new project-name]のコマンドでプロジェクト作ったらあとは個別コメント確認

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // 基本的なロギングは内蔵されているた下記のように使用可能
    // カスタムしたい場合など下記を参照
    // https://zenn.dev/kisihara_c/books/nest-officialdoc-jp/viewer/techniques-logger
    logger: ['error', 'warn', 'log'],
  });
  // アプリケーションのグローバルなオブジェクトに対して、バリデーション時にエラーを返却するための Pipe

  // リクエストに改ざんするプラグイン
  app.useGlobalPipes(
    new ValidationPipe({
      // https://zenn.dev/kisihara_c/books/nest-officialdoc-jp/viewer/techniques-validation
      // dtoの値に対する検証とは別に、Request値をControllerで受け取るまえに任意の処理を挟み込める。
      // DTOに宣言されているプロパティだけを後続処理に渡すことができる。
      whitelist: true,
      // DTOに宣言されていないプロパティが渡された場合、エラーとすることができる。
      // whitelistがtrueのときしか動作しない
      forbidNonWhitelisted: true,
    }),
  );
  // 全体に対するプレフィックス
  app.setGlobalPrefix('api/v1');

  // バックエンドのフレームワーク等の隠蔽'x-powered-by'
  // この辺を片っ端から処理してくれるライブラリとりあえずかぶせておくべし
  app.use(helmet());

  app.enableCors({
    // アクセス許可するオリジン
    origin: process.env.ORIGIN,
    allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept',
    // レスポンスヘッダーにAccess-Control-Allow-Credentials追加
    credentials: true,
    // レスポンスstatusを200に設定
    optionsSuccessStatus: 200,
  });

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log('Liste on port: ' + port);
}
bootstrap();
