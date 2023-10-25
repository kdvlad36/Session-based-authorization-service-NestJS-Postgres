import { Controller, Request, Post, UseGuards, Get, Req } from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  sessionService: any;
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiOperation({ summary: 'Login user' })
  @ApiResponse({ status: 201, description: 'Logged in successfully' })
  @ApiResponse({ status: 400, description: 'Invalid credentials' })
  async login(@Request() req) {
    return this.authService.login(req.user, req.device.type); // Просто предположение
  }

  @Get('sessions')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth() // Because JWT is typically used as a Bearer token
  @ApiOperation({ summary: 'Get sessions for a user' })
  @ApiResponse({ status: 200, description: 'Sessions retrieved successfully' })
  async getSessions(@Req() req) {
    return this.sessionService.findByUser(req.user);
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth() // Bearer token needed for logout as well
  @ApiOperation({ summary: 'Logout user' })
  @ApiResponse({ status: 200, description: 'Logged out successfully' })
  async logout(@Req() req) {
    await this.authService.logout(req.headers.authorization.split(' ')[1]);
    return { message: 'Logged out successfully' };
  }
}
