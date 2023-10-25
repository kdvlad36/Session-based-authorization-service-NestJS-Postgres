import { Injectable, Req } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../users/user.service';
import * as bcrypt from 'bcrypt';
import { UserEntity } from '../users/user.entity';
import { SafeUser } from 'src/users/user.interface';
import { SessionService } from '../session/session.service';
import { Request } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly sessionService: SessionService, // Добавьте это
  ) {}

  async findUserByEmail(email: string): Promise<SafeUser | null> {
    const user = await this.userService.findOne(email);
    if (!user) {
      return null;
    }
    const { ...result } = user;
    return result;
  }

  async validateUser(
    email: string,
    password: string,
  ): Promise<UserEntity | null> {
    const user = await this.userService.findOne(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      return user; // здесь нам неважно, что пароль включен в объект, так как это не объект ответа
    }
    return null;
  }

  async login(@Req() req: Request, user: UserEntity) {
    // теперь у вас есть доступ к объекту req в этом методе
    const deviceType = req.device.type;
    const payload = { email: user.email, sub: user.id };
    const token = this.jwtService.sign(payload);
    await this.sessionService.create(token, user, deviceType);
    return {
      access_token: token,
    };
  }

  async logout(jwt: string): Promise<void> {
    await this.sessionService.delete(jwt);
  }
}
