import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { plainToInstance, Transform, Type } from 'class-transformer';
import { User } from '../entities/user.entity';
import { Role } from '../../roles/entities/role.entity';
import { Status } from '../../statuses/entities/status.entity';

export class FilterUserDto {
  @ApiProperty({ type: Role })
  @IsOptional()
  // @ValidateNested({ each: true })
  @Type(() => Role)
  roles?: Role[] | null;

  @ApiProperty({ type: Status })
  @IsOptional()
  // @ValidateNested({ each: true })
  @Type(() => Status)
  status?: Status[] | null;

  @ApiProperty({ type: Number })
  @IsOptional()
  tier?: number | null;
}

export class SortUserDto {
  @ApiProperty()
  @IsString()
  orderBy: keyof User;

  @ApiProperty()
  @IsString()
  order: string;
}

export class QueryUserDto {
  @ApiProperty({
    required: false,
  })
  @Transform(({ value }) => (value ? Number(value) : 1))
  @IsNumber()
  @IsOptional()
  page: number;

  @ApiProperty({
    required: false,
  })
  @Transform(({ value }) => (value ? Number(value) : 10))
  @IsNumber()
  @IsOptional()
  limit: number;

  @ApiProperty({ type: String, required: false })
  @IsOptional()
  @Transform(({ value }) => {
    try {
      // Cố gắng phân tích cú pháp chuỗi JSON. Nếu không phải là JSON hợp lệ, trả về undefined.
      return value ? plainToInstance(FilterUserDto, value) : undefined;
    } catch (error) {
      // Nếu có lỗi phân tích cú pháp, có thể bạn muốn log lỗi hoặc xử lý theo cách khác
      console.error('Error parsing JSON:', error);
      return undefined;
    }
  })
  @ValidateNested()
  @Type(() => FilterUserDto)
  filters?: FilterUserDto | null;

  @ApiProperty({ type: String, required: false })
  @IsOptional()
  @Transform(({ value }) => {
    return value ? plainToInstance(SortUserDto, JSON.parse(value)) : undefined;
  })
  @ValidateNested({ each: true })
  @Type(() => SortUserDto)
  sort?: SortUserDto[] | null;

  @ApiProperty({ type: String, required: false })
  @IsOptional()
  searchText?: string;
}
