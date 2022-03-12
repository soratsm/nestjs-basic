import { PartialType, PickType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString } from 'class-validator';

// 「interface や Type ではなく class で定義する」と覚えておくと OK
// NestJS がコンパイルされた後もプロパティ情報を保持するためのビルド都合
export class CreateCatDto {
  // validate追加
  // controllerで@bodyと組み合わせることで入力を保証できる
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  age: number;

  breed: string;
}

// updateのときすべてをオプション型とするような構文
export class UpdateCatDto extends PartialType(CreateCatDto) {}
// updateのときすべてをオプション型とするような構文
export class UpdateCatAgeDto extends PickType(CreateCatDto, ['age'] as const) { }
