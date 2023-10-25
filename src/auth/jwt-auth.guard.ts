// src/auth/jwt-auth.guard.ts

import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    // Проверка JWT токена и выполнение рута
    return super.canActivate(context);
  }

  handleRequest(err, user) {
    // Если токен не валидный или истек, выбросить ошибку
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
