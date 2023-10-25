import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../users/user.service';
import * as bcrypt from 'bcrypt';
import { UserEntity } from '../users/user.entity';
import { SafeUser } from 'src/users/user.interface';
import { SessionService } from '../session/session.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly sessionService: SessionService,
  ) {}

  async findUserByEmail(email: string): Promise<SafeUser | null> {
    const user = await this.userService.findOne(email);
    if (!user) {
      return null;
    }
    return {
      id: user.id,
      email: user.email,
      created_at: user.created_at,
      updated_at: user.updated_at,
    };
  }

  async validateUser(
    email: string,
    password: string,
  ): Promise<UserEntity | null> {
    const user = await this.userService.findOne(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return null;
  }

  async login(user: UserEntity, deviceType: string) {
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
