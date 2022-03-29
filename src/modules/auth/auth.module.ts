import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';
import { UsersService } from '../users/users.service';
import { authConstants } from './auth.constants';
import { AuthController } from './auth.controller';
import { AuthJwtStrategy } from './auth.jwt.strategy';
import { AuthLocalGuard } from './auth.local.guard';
import { AuthLocalStrategy } from './auth.local.strategy';
import { AuthService } from './auth.service';

@Module({
  imports: [
    JwtModule.register({ secret: authConstants.secret }),
    PassportModule,
    UsersModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthJwtStrategy,
    AuthLocalGuard,
    AuthLocalStrategy,
    AuthService,
    UsersService,
  ],
})
export class AuthModule {}
