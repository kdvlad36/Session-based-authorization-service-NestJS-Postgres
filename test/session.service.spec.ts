import { Test, TestingModule } from '@nestjs/testing';
import { SessionService } from '../src/session//session.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { SessionEntity } from '../src/session/session.entity';
import { Repository } from 'typeorm';
import { UserEntity } from '../src/users/user.entity';

describe('SessionService', () => {
  let service: SessionService;
  let repo: Repository<SessionEntity>;
  let user: UserEntity;
  let session: SessionEntity;

  beforeEach(async () => {
    user = new UserEntity();
    user.id = 1;

    session = new SessionEntity();
    session.jwt = 'some-jwt-token';
    session.user = user;
    session.deviceType = 'web';

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SessionService,
        {
          provide: getRepositoryToken(SessionEntity),
          useValue: {
            create: jest.fn().mockReturnValue(session),
            save: jest.fn().mockResolvedValue(session),
            delete: jest.fn().mockResolvedValue(undefined),
            createQueryBuilder: jest.fn().mockReturnValue({
              innerJoinAndSelect: jest.fn().mockReturnThis(),
              where: jest.fn().mockReturnThis(),
              getMany: jest.fn().mockResolvedValue([session]),
            }),
          },
        },
      ],
    }).compile();

    service = module.get<SessionService>(SessionService);
    repo = module.get<Repository<SessionEntity>>(
      getRepositoryToken(SessionEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a session', async () => {
      const result = await service.create('some-jwt-token', user, 'web');
      expect(result).toEqual(session);
      expect(repo.create).toBeCalledWith({
        jwt: 'some-jwt-token',
        user,
        deviceType: 'web',
      });
      expect(repo.save).toBeCalledWith(session);
    });
  });

  describe('findByUser', () => {
    it('should find sessions by user', async () => {
      const result = await service.findByUser(user);
      expect(result).toEqual([session]);
    });
  });

  describe('delete', () => {
    it('should delete a session', async () => {
      await service.delete('some-jwt-token');
      expect(repo.delete).toBeCalledWith({ jwt: 'some-jwt-token' });
    });
  });
});
