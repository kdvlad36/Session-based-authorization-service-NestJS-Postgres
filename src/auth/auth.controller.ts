import {
  Controller,
  Post,
  UseGuards,
  Get,
  Req,
  Res,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { SessionService } from '../session/session.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private sessionService: SessionService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiOperation({ summary: 'Login user' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Logged in successfully',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid credentials',
  })
  async login(@Req() req, @Res() res) {
    const { user, deviceType } = req;

    try {
      const loginResult = await this.authService.login(user, deviceType);
      return res.status(HttpStatus.CREATED).json(loginResult);
    } catch (error) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: 'Invalid credentials' });
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('sessions')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get sessions for a user' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Sessions retrieved successfully',
  })
  async getSessions(@Req() req) {
    return this.sessionService.findByUser(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Logout user' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Logged out successfully',
  })
  async logout(@Req() req) {
    await this.authService.logout(req.user.jwt);
    return { message: 'Logged out successfully' };
  }
}
