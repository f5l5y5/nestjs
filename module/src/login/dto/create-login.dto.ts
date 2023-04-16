import { IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';
export class CreateLoginDto {
  @IsNotEmpty()
  @IsString()
  @Length(5, 10, {
    message: '字符在5个到10个之间',
  })
  name: string;

  @IsNotEmpty()
  @IsNumber()
  age: number;
}
