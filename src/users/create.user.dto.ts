import { IsEmail, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'User email address',
    example: 'user@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'User password', example: 'securePassword123' })
  @IsString()
  @MinLength(6)
  password: string;

  // Добавьте декораторы ApiProperty для других полей по мере необходимости
}
