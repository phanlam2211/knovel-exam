import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Role } from 'src/roles/entities/role.entity';
import { Status } from 'src/statuses/entities/status.entity';
import { UserSeedService } from './user-seed.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role, Status])],
  providers: [UserSeedService],
  exports: [UserSeedService],
})
export class UserSeedModule {}
