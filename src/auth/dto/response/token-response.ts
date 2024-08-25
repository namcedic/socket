import { ApiProperty } from '@nestjs/swagger';

export class TokenResponse {
  @ApiProperty({
    type: 'string',
  })
  token: string;

  @ApiProperty({
    type: 'string',
  })
  refreshToken: string;

  @ApiProperty({
    type: Date,
  })
  tokenExpires: Date;
}
