import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthGuard, JwtStrategy } from './strategies/jwt.strategy';
import { AnonymousStrategy } from './strategies/anonymous.strategy';
import { UsersModule } from '../users/users.module';
import { IsExist } from '../utils/validators/is-exists.validator';
import { IsNotExist } from '../utils/validators/is-not-exists.validator';
import { SessionModule } from '../session/session.module';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';

@Module({
  imports: [UsersModule, SessionModule, JwtModule.register({})],
  controllers: [AuthController],
  providers: [
    IsExist,
    IsNotExist,
    AuthService,
    JwtStrategy,
    JwtAuthGuard,
    JwtRefreshStrategy,
    AnonymousStrategy,
  ],
  exports: [AuthService, JwtAuthGuard],
})
export class AuthModule {}
