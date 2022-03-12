import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsController } from './cats/cats.controller';
// import { CatsService } from './cats/cats.service';
import { CatsModule } from './cats/cats.module';

// 環境変数の利用
import { ConfigModule } from '@nestjs/config';

// 定期実行の提供
import { ScheduleModule } from '@nestjs/schedule';
import { TasksModule } from './tasks/tasks.module';

// ブルートフォース攻撃（総当り）対策
// webapiメインだとあまり使わないかも
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  // 下のコメントアウトのように個別に追加してもいいが
  //それすらも切り出すのが本来のあり方。そのためimportとしてmoduleを読み込む
  imports: [
    CatsModule,
    ScheduleModule.forRoot(),
    TasksModule,
    ConfigModule.forRoot({
      envFilePath: ['.env.local'],
    }),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
  ],
  // ルーティングを追加したらここに追記
  // cmdで生成すると自動追記
  // controllers: [AppController, CatsController],
  // ロジックを追加したらここに追記
  // providers: [AppService, CatsService],
  controllers: [AppController],
  providers: [AppService],
})

// 自作ミドルウェアの適用
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      /** 特定のルートをミドルウェアの対象外にしたい場合がある。
          exclude()メソッドを使用すると特定のルートを簡単に除外する事ができる。
          以下のように単一の文字列、複数の文字列、もしくはRouteInfoオブジェクトを渡して実行する。
      */
      .exclude(
        { path: 'cats', method: RequestMethod.GET },
        { path: 'cats', method: RequestMethod.POST },
        'cats/(.*)',
      )
      .forRoutes(CatsController);
  }
}
