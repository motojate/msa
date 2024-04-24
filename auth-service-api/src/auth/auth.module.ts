import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { LoginHandler } from './commands/login.hanlder';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        privateKey: configService.get<string>('PRIVATE_SECRET_KEY'),
        signOptions: { algorithm: 'RS256', expiresIn: '1000m' },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [AuthService, LoginHandler],
  controllers: [AuthController],
})
export class AuthModule {}
