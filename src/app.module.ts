import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './users/user.entity';
import { UserModule } from './users/user.module';
import { AuthModule } from './auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './auth/jwt.strategy';
import { AuthService } from './auth/auth.service';
import { UserController } from './users/user.controller';
import { AuthController } from './auth/auth.controller';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { SessionController } from './session/session.controller';
import { SessionModule } from './session/session.modile';
import { databaseConfig } from './database.config'; // Измените путь к вашему файлу конфигурации
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig),
    TypeOrmModule.forFeature([UserEntity]),
    UserModule,
    AuthModule,
    PassportModule,
    JwtModule,
    SessionModule,
  ],
  controllers: [
    AppController,
    AuthController,
    UserController,
    SessionController,
  ],
  providers: [AppService, AuthService, JwtStrategy, LocalAuthGuard],
  exports: [AuthService],
})
export class AppModule {}
