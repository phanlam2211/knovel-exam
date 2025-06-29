import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { User } from 'src/users/entities/user.entity';

export class AuthEmailLoginResponseDto {
  @ApiProperty()
  @IsNotEmpty()
  token: string;
  @ApiProperty()
  @IsNotEmpty()
  refreshToken: string;
  @ApiProperty()
  @IsNotEmpty()
  tokenExpires: string;
  @ApiProperty()
  @IsNotEmpty()
  user: User;

  @ApiProperty()
  @IsNotEmpty()
  infoTokenStore: object;
}
