import { ApiProperty } from '@nestjs/swagger';

export class InfinityPaginationResultTypeSwagger<T> {
  @ApiProperty()
  total: number;

  @ApiProperty({ isArray: true })
  data: T[];
}
