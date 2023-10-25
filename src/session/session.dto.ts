import { ApiProperty } from '@nestjs/swagger';

export class SessionDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  jwt: string;

  @ApiProperty()
  deviceType: string;

  // Добавьте другие поля, которые возвращает ваш метод
}
