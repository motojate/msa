import { All, Controller, Get, Inject, Req } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ServiceToken } from 'src/config/config.inject.data';
import { Request as ExpressRequest } from 'express';
import { proxySend } from 'src/util/proxy.util';

@Controller('user')
export class UserController {
  constructor(
    @Inject(ServiceToken.USER_SERVICE)
    private readonly authProxy: ClientProxy,
  ) {}

  @All('*')
  handleAuth(@Req() req: ExpressRequest) {
    return proxySend(this.authProxy, req);
  }
}
