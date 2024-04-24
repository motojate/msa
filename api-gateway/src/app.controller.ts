import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ThrottlerBehindProxyGuard } from './util/guards/throttler-behind-proxy.guard';

@Controller()
@UseGuards(ThrottlerBehindProxyGuard)
export class AppController {
  @Get('cookie-check')
  @UseGuards(AuthGuard('jwt'))
  async cookieCheck() {
    return true;
  }
}
