import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request) => {
          if (request && request.cookies)
            return request.cookies['access_token'];
          else throw new Error('NULL_TOKEN');
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: process.env.PUBLIC_SECRET_KEY,
      algorithms: ['RS256'],
    });
  }

  async validate(payload: { userSeq: string }) {
    console.log(payload);
    return { userSeq: payload.userSeq };
  }
}
