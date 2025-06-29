import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { StatusEnum } from '../../statuses/statuses.enum';

export class UpdateStatusUsersDto {
  @ApiProperty()
  @IsNotEmpty()
  userIds: number[];

  @ApiProperty()
  @IsNotEmpty()
  status: StatusEnum;
}
