import {
  Controller,
  Get,
  Query,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Req,
  Res,
  HttpStatus,
  HttpException,
  ParseIntPipe,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { CreateCatDto } from './dto/create-cat.dto';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';

// 【http://localhost:8000/cats】に該当する
// cmd:nest g controller cats

@Controller('cats')
export class CatsController {
  // サービスのロジックを利用する
  constructor(private catsService: CatsService) {}

  // 型定義をdtoとして付与
  @Post()
  aa(@Body() createCatDto: CreateCatDto) {
    createCatDto.age = 1;
    createCatDto.breed = 'aaa';
    createCatDto.name = 'aaa';
    return `This action adds a new cat ${createCatDto.breed}`;
  }

  // クエリパラメータの設定
  // http://localhost:8000/cats?limit=12
  @Get()
  find(@Query() query) {
    return `This action returns all cats (limit: ${query.limit} items)`;
  }

  // リクエスト情報の取得
  @Get('req')
  findReq(@Req() request: Request) {
    return request.body;
  }

  // レスポンスの送信
  // 特段設定する必要がなければリターンでもいいが
  @Get('res')
  async findRes(@Res() res: Response) {
    try {
      const generated = await { dateOfBirth: '2022-03-06aaa' };
      res.set({
        'content-type': 'application/rss+xml; charset=UTF-8',
      });
      res.send(generated);
    } catch (error) {
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // パラメータの使用
  // http://localhost:8000/cats/aaaa
  @Get(':id')
  findOne(@Param('id') id: string) {
    return `This action returns a #${id} cat`;
  }

  // サービスのロジックを利用する
  @Put(':id')
  async create(@Body() createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
  }

  @Delete(':id')
  // 明示的な変換を記載するとわかりやすいかも
  async findAll(@Param('id', ParseIntPipe) id: number): Promise<Cat[]> {
    return this.catsService.findAll();
  }
}
