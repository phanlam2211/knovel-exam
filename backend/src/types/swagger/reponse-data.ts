import { ApiProperty } from '@nestjs/swagger';

export class ResponseDataSwagger<T> {
  @ApiProperty()
  statusCode: number;

  @ApiProperty()
  message: string;

  @ApiProperty()
  data: T;
}
