import { ApiProperty } from '@nestjs/swagger';

export class DeleteSessionResponseDto {
  @ApiProperty()
  message: string;
}
