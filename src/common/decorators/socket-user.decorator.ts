import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import { AuthPayload } from '../types/auth.type';
import * as dotenv from 'dotenv';
dotenv.config();

const jwt = new JwtService();

export const CurrentSocketUser = createParamDecorator(
  async (data: unknown, context: ExecutionContext): Promise<AuthPayload> => {
    const client: Socket = context.switchToWs().getClient<Socket>();
    const token = client.handshake.headers.authorization?.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException();
    }

    const user = (await jwt.verifyAsync(token, {
      secret: process.env.JWT_SECRET,
    })) as AuthPayload;

    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  },
);
