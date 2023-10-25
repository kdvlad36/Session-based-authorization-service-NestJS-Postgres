import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from 'src/users/user.entity';

export class SessionResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  jwt: string;

  @ApiProperty()
  deviceType: string;

  @ApiProperty({ type: () => UserEntity })
  user: UserEntity;

  // Добавьте другие поля, которые может возвращать ваш метод, если они есть
}
