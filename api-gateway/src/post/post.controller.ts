import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import axios from 'axios';
import { ThrottlerBehindProxyGuard } from 'src/util/guards/throttler-behind-proxy.guard';

@Controller('post')
@UseGuards(ThrottlerBehindProxyGuard)
export class PostController {
  @Get()
  @UseGuards(AuthGuard('jwt'))
  async getAllPosts() {
    const response = await axios.get('http://localhost:8081/post');
    return response.data;
  }
}
