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

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'yourusername',
      password: 'yourpassword',
      database: 'yourdbname',
      entities: [UserEntity],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([UserEntity]),
    UserModule,
    AuthModule,
    PassportModule,
    JwtModule,
    SessionModule,
  ],
  controllers: [AuthController, UserController, SessionController],
  providers: [AuthService, JwtStrategy, LocalAuthGuard],
  exports: [AuthService],
})
export class AppModule {}
