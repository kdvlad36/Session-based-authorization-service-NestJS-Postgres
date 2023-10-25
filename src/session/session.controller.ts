import { Controller, Delete, Get, Param, UseGuards, Req } from '@nestjs/common';
import { SessionService } from './session.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserEntity } from 'src/users/user.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('sessions')
@Controller('sessions')
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Req() req): Promise<any[]> {
    const user: UserEntity = req.user;
    return this.sessionService.findByUser(user);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':jwt')
  async delete(@Param('jwt') jwt: string): Promise<any> {
    await this.sessionService.delete(jwt);
    return { message: 'Session deleted successfully' };
  }
}
