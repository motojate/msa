import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { HeaderToken } from 'src/public/interfaces/common.interface';
import { LoginCommand } from './commands/login.command';
import { QueryBus } from '@nestjs/cqrs';
import { GetUserQuery } from 'src/user/queries/get-user.query';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly queryBus: QueryBus,
  ) {}

  private createToken(userSeq: string, option?: { expiresIn: string }) {
    const payload = { userSeq };
    return this.jwtService.sign(payload, option);
  }

  private createRefreshToken(userSeq: string) {
    const token = this.createToken(userSeq, { expiresIn: '30d' });
    return token;
  }

  private async validateUser(loginAuthDto: LoginCommand): Promise<string> {
    const { password, userId } = loginAuthDto;
    const user = await this.queryBus.execute(new GetUserQuery(userId));
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) throw new Error();
    return user.userSeq;
  }

  async login(dto: LoginCommand): Promise<HeaderToken> {
    const userSeq = await this.validateUser(dto);
    const [accessToken, refreshToken] = await Promise.all([
      this.createToken(userSeq),
      this.createRefreshToken(userSeq),
    ]);
    return {
      accessToken,
      refreshToken,
    };
  }
}
