import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    type: String,
    description: 'User email',
    example: 'user@example.com',
  })
  email: string;

  @ApiProperty({
    type: String,
    description: 'User password',
    example: 'password123',
  })
  password: string;
}
