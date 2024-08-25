import {
  Controller,
  Request,
  Post,
  UseGuards,
  Body,
  Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthenticationGuard } from '../common/guards/auth.guard';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginEmailInput } from './dto/requests/login-email.input';
import { TokenResponse } from './dto/response/token-response';
import { AuthGuard } from '@nestjs/passport';
import { AuthPayload } from '../common/types/auth.type';
import { CurrentUser } from '../common/decorators/user.decorator';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  @ApiResponse({
    type: TokenResponse,
  })
  @ApiBody({
    type: LoginEmailInput,
  })
  async login(@Request() req) {
    const user = req.user;
    return this.authService.login(user);
  }

  @Post('register')
  async register(@Body() input: CreateUserDto) {
    return this.authService.register(input);
  }

  @ApiBearerAuth()
  @UseGuards(AuthenticationGuard)
  @Get('profile')
  getProfile(@CurrentUser() user: AuthPayload) {
    return user;
  }
}
