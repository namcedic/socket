import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../database/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthenticationGuard } from '../common/guards/auth.guard';
import { PassportModule } from '@nestjs/passport';
import { EmailStrategy } from './strategies/email.strategy';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtService,
    JwtStrategy,
    EmailStrategy,
    AuthenticationGuard,
  ],
  imports: [TypeOrmModule.forFeature([UserEntity]), UserModule, PassportModule],
})
export class AuthModule {}
