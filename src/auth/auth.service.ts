import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { comparePassword, hashPassword } from '../common/utils/password';
import { UserEntity } from '../database/entities/user.entity';
import { CreateUserDto } from '../user/dto/create-user.dto';
import * as process from 'node:process';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    if (!user || !(await comparePassword(user.password, pass))) {
      throw UnauthorizedException;
    }

    return user;
  }

  async login(user: UserEntity) {
    const payload = {
      username: user.email,
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
    };
    return {
      accessToken: await this.jwtService.signAsync(payload, {
        secret: process.env.JWT_SECRET,
      }),
    };
  }

  async register(input: CreateUserDto): Promise<UserEntity> {
    input.password = await hashPassword(input.password);
    return await this.userService.createUser(input);
  }
}
