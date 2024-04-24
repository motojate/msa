import {
  All,
  Body,
  Controller,
  Get,
  HttpCode,
  Inject,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { LoginAuthDto } from './dto/auth.dto';
import { ServiceToken } from 'src/config/config.inject.data';
import { proxySend } from 'src/util/proxy.util';
import { lastValueFrom, tap } from 'rxjs';
import {
  Response as ExpressResponse,
  Request as ExpressRequest,
} from 'express';
import { HeaderToken } from 'src/util/interface/common.interface';
import { ThrottlerBehindProxyGuard } from 'src/util/guards/throttler-behind-proxy.guard';

@Controller('auth')
@UseGuards(ThrottlerBehindProxyGuard)
export class AuthController {
  constructor(
    @Inject(ServiceToken.AUTH_SERVICE)
    private readonly authProxy: ClientProxy,
  ) {}

  @Get('active')
  async checkUserId(@Query('userId') userId: string) {
    console.log(userId);
    return this.authProxy.send({ cmd: 'active', method: 'GET' }, { userId });
  }

  @Post('login')
  @HttpCode(204)
  async login(@Body() loginAuthDto: LoginAuthDto, @Res() res: ExpressResponse) {
    const tokens$ = this.authProxy
      .send<HeaderToken>({ cmd: 'login', method: 'POST' }, loginAuthDto)
      .pipe(
        tap((token) => {
          res.cookie('access_token', token.accessToken, { httpOnly: true });
          res.cookie('refresh_token', token.refreshToken, {
            httpOnly: true,
          });
        }),
      );

    await lastValueFrom(tokens$);

    res.send();
  }

  @All('*')
  handleAuth(@Req() req: ExpressRequest) {
    return proxySend(this.authProxy, req);
  }
}
