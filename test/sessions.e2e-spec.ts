import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AuthModule } from '../src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../src/users/user.entity';
import { SessionEntity } from '../src/session/session.entity';
import { UserService } from '../src/users/user.service';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('AuthController (e2e)', () => {
  let app: INestApplication;
  let userService: UserService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AuthModule,
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          dropSchema: true,
          entities: [UserEntity, SessionEntity],
          synchronize: true,
          logging: false,
        }),
        TypeOrmModule.forFeature([UserEntity, SessionEntity]),
      ],
      providers: [
        UserService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: {}, // здесь вы должны предоставить мок-репозиторий или настроить его в соответствии с вашими нуждами
        },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    userService = moduleFixture.get<UserService>(UserService);
    await app.init();

    // Создание тестового пользователя
    await userService.create({
      email: 'user@example.com',
      password: 'securePassword123',
    });
  });

  it('/auth/login (POST)', async () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'user@yourusername.com', password: 'securePassword123' }) // Используйте правильные учетные данные
      .expect(201)
      .expect((res) => {
        expect(res.body).toHaveProperty('access_token');
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
