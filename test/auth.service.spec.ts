import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../src/auth/auth.service';
import { UserService } from '../src/users/user.service';
import { JwtService } from '@nestjs/jwt';
import { SessionService } from '../src/session/session.service';

describe('AuthService', () => {
  let service: AuthService;
  let userService: UserService;

  const mockedUser = {
    id: 1,
    email: 'test@test.com',
    password: 'secret',
    created_at: new Date(),
    updated_at: new Date(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: {
            findOne: jest.fn().mockResolvedValue(mockedUser),
          },
        },
        {
          provide: JwtService,
          useValue: {
            // Моки для методов JwtService, если они используются в AuthService
          },
        },
        {
          provide: SessionService,
          useValue: {
            // Моки для методов SessionService, если они используются в AuthService
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(userService).toBeDefined();
  });

  // Остальные тесты
});
