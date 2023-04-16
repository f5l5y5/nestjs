import { ApiProperty } from '@nestjs/swagger';

export class CreateGuardDto {
  @ApiProperty({ example: 'jack', type: String })
  name: string;
  @ApiProperty()
  age: number;
}
