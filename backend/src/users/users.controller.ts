/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { User } from 'src/users/entities/user.entity';
import { Roles } from '../roles/roles.decorator';
import { RolesEnum } from '../roles/roles.enum';
import { RolesGuard } from '../roles/roles.guard';
import { AuthGuard } from '@nestjs/passport';
import { InfinityPaginationResultTypeSwagger } from '../types/swagger/infinity-pagination-result';
import { InfinityPaginationAndCountResultType } from '../utils/types/infinity-pagination-result.type';
import { infinityAndCountPagination } from '../utils/infinity-pagination';
import { QueryUserDto } from './dto/query-user.dto';
import { UpdateUserDto } from './dto/update-campaign.dto';
import { ResponseDataSwagger } from '../types/swagger/reponse-data';
import { CreateUserDto } from './dto/create-user.dto';

@ApiBearerAuth()
@ApiTags('Users')
@Controller({
  path: 'users',
  version: '1',
})
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/create-employee')
  @Roles(RolesEnum.EMPLOYER)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @HttpCode(HttpStatus.CREATED)
  @ApiOkResponse({
    description: 'Create a new employee',
    type: ResponseDataSwagger<User>,
  })
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.createEmployee(createUserDto);
  }

  @Get()
  @Roles(RolesEnum.EMPLOYER)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Get all users',
    type: InfinityPaginationResultTypeSwagger<User>,
  })
  async findAll(
    @Query() query: QueryUserDto,
  ): Promise<InfinityPaginationAndCountResultType<User>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 50;
    if (limit > 100) {
      limit = 100;
    }

    return infinityAndCountPagination(
      await this.usersService.findManyWithPagination({
        filterOptions: query?.filters,
        sortOptions: query?.sort,
        paginationOptions: {
          page,
          limit,
        },
        searchText: query?.searchText,
      }),
      { page, limit },
    );
  }

  @Get('employees')
  @Roles(RolesEnum.EMPLOYER)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Get all employees',
    type: [User],
  })
  async findAllEmployees(): Promise<User[]> {
    return this.usersService.findAllEmployees();
  }

  @Patch(':id')
  @Roles(RolesEnum.EMPLOYER)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @HttpCode(HttpStatus.OK)
  update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @Roles(RolesEnum.EMPLOYER)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOkResponse({
    description: 'Delete an employee',
  })
  async remove(@Param('id') id: number): Promise<void> {
    await this.usersService.softDelete(id);
  }
}
