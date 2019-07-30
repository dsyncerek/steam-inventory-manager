import { Module } from '@nestjs/common';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategy/jwt.strategy';
import { OpenidStrategy } from './strategy/openid.strategy';

const jwtConfig: JwtModuleOptions = {
  secret: 'jwt-secret',
  signOptions: { expiresIn: 3600 },
};

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register(jwtConfig),
  ],
  providers: [
    AuthService,
    OpenidStrategy,
    JwtStrategy,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
