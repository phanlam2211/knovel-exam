import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { Brackets, DeepPartial, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { NullableType } from '../utils/types/nullable.type';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { FilterUserDto, SortUserDto } from './dto/query-user.dto';
import { throwCustomException } from '../utils/throw-exception-helper';
import { RolesEnum } from '../roles/roles.enum';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async createEmployee(createUserDto: CreateUserDto): Promise<User> {
    // Check if user with email already exists
    const existingUser = await this.findByEmail(createUserDto.email);
    if (existingUser) {
      throwCustomException('User with this email already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    // Create user with hashed password and default role as EMPLOYEE
    const user = this.usersRepository.create({
      ...createUserDto,
      password: hashedPassword,
      roleId: 2, // Default to EMPLOYEE role (ID: 2)
    });

    return await this.usersRepository.save(user);
  }

  findOne(fields: EntityCondition<User>): Promise<NullableType<User>> {
    return this.usersRepository.findOne({
      where: fields,
      relations: ['role'],
    });
  }

  findAll(fields: EntityCondition<User>): Promise<NullableType<User[]>> {
    return this.usersRepository.find({
      where: fields,
    });
  }

  findManyWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
    searchText,
  }: {
    filterOptions?: FilterUserDto | null;
    sortOptions?: SortUserDto[] | null;
    paginationOptions: IPaginationOptions;
    searchText?: string;
  }): Promise<[User[], number]> {
    const queryBuilder = this.usersRepository.createQueryBuilder('user');

    // Join với bảng wallet nếu cần tìm kiếm theo address
    queryBuilder.leftJoinAndSelect('user.role', 'role');

    // queryBuilder.leftJoinAndSelect('user.inviteCodes', 'invite_code');

    // Xử lý filter options
    if (filterOptions?.roles) {
      const roleIds = Array.isArray(filterOptions?.roles)
        ? filterOptions?.roles
        : [filterOptions?.roles];
      queryBuilder.andWhere('user.roleId IN (:...roleIds)', {
        roleIds: roleIds,
      });
    }

    // Xử lý search text
    if (searchText) {
      queryBuilder.andWhere(
        new Brackets((qb) => {
          qb.where('LOWER(user.email) LIKE LOWER(:searchText)', {
            searchText: `%${searchText.toLowerCase()}%`,
          });
        }),
      );
    }

    // Xử lý pagination
    queryBuilder.skip((paginationOptions.page - 1) * paginationOptions.limit);
    queryBuilder.take(paginationOptions.limit);

    // Xử lý sort options
    if (sortOptions) {
      sortOptions.forEach((sort) => {
        queryBuilder.addOrderBy(`user.${sort.orderBy}`, sort.order as any);
      });
    }
    return queryBuilder.getManyAndCount().then(([users, count]) => {
      // Fetch inviteCodes separately for the relevant user
      return [users, count];
    });
  }
  update(id: User['id'], payload: DeepPartial<User>): Promise<User> {
    const user = this.usersRepository.findOne({ where: { id: id } });
    if (!user) {
      throwCustomException('User not found');
    }
    return this.usersRepository.save(
      this.usersRepository.create({
        id,
        ...payload,
      }),
    );
  }

  async softDelete(id: User['id']): Promise<void> {
    await this.usersRepository.softDelete(id);
  }

  async findByEmail(email: string): Promise<NullableType<User>> {
    return this.usersRepository.findOne({
      where: { email },
      relations: ['role'],
    });
  }

  async findById(id: User['id']): Promise<NullableType<User>> {
    return this.usersRepository.findOne({
      where: { id },
      relations: ['role'],
    });
  }

  async findAllEmployees(): Promise<User[]> {
    return this.usersRepository.find({
      where: { role: { name: RolesEnum.EMPLOYEE } },
      relations: ['role'],
    });
  }

  async remove(id: User['id']): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
