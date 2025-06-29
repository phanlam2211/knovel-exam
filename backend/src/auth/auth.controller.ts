import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  Request,
  SerializeOptions,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  ApiBearerAuth,
  ApiExtraModels,
  ApiOkResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';

import { AuthGuard } from '@nestjs/passport';
import { LoginResponseType } from './types/login-response.type';
import { NullableType } from '../utils/types/nullable.type';
import { AuthEmailLoginResponseDto } from 'src/auth/dto/auth-email-login-reponse.dto';

import { UsersService } from 'src/users/users.service';
import { AuthEmailLoginDto } from './dto/auth-email-login.dto';
import { User } from 'src/users/entities/user.entity';
import { AuthUpdateDto } from './dto/auth-update.dto';
import { RefreshResponseDto } from './dto/refresh-response.dto';

// import { User } from '../users/entities/user.entity';
@ApiTags('Auth')
@Controller({
  path: 'auth',
  version: '1',
})
export class AuthController {
  constructor(
    private readonly service: AuthService,
    private readonly userService: UsersService,
  ) {}

  @SerializeOptions({
    groups: ['me'],
  })
  @Post('/login')
  @HttpCode(HttpStatus.OK)
  @ApiExtraModels(AuthEmailLoginResponseDto)
  @ApiOkResponse({
    status: 200,
    schema: {
      $ref: getSchemaPath(AuthEmailLoginResponseDto),
    },
  })
  public login(
    @Body() loginDto: AuthEmailLoginDto,
  ): Promise<LoginResponseType> {
    return this.service.validateLogin(loginDto);
  }

  @Get('/me')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: '', type: User })
  public async me(@Request() request): Promise<NullableType<any>> {
    const user = await this.service.me(request.user);

    return user;
  }

  @ApiBearerAuth()
  @ApiOkResponse({
    type: RefreshResponseDto,
  })
  @SerializeOptions({
    groups: ['me'],
  })
  @Post('refresh')
  @UseGuards(AuthGuard('jwt-refresh'))
  @HttpCode(HttpStatus.OK)
  public refresh(@Request() request): Promise<RefreshResponseDto> {
    return this.service.refreshToken({
      sessionId: request.user.sessionId,
      hash: request.user.hash,
    });
  }

  @ApiBearerAuth()
  @SerializeOptions({
    groups: ['me'],
  })
  @Patch('me')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: User,
  })
  public update(
    @Request() request,
    @Body() userDto: AuthUpdateDto,
  ): Promise<NullableType<User>> {
    return this.service.update(request.user, userDto);
  }

  @ApiBearerAuth()
  @Post('logout')
  @ApiOkResponse({ description: '', type: 'any' })
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.NO_CONTENT)
  public async logout(@Request() request): Promise<void> {
    await this.service.logout({
      sessionId: request.user.sessionId,
    });
  }
}
