import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { IsExist } from '../utils/validators/is-exists.validator';
import { IsNotExist } from '../utils/validators/is-not-exists.validator';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule.register({}), TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [IsExist, IsNotExist, UsersService],
  exports: [UsersService],
})
export class UsersModule {}
