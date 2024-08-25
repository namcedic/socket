import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { AuthenticationGuard } from '../guards/auth.guard';

export function Auth() {
  return applyDecorators(
    // Roles(...roles),
    UseGuards(AuthenticationGuard),
    ApiBearerAuth(),
    ApiUnauthorizedResponse({ description: 'Unauthorized"' }),
  );
}
