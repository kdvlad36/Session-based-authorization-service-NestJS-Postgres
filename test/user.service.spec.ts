import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../src/users/user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserEntity } from '../src/users/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../src/users/create.user.dto';

describe('UserService', () => {
  let service: UserService;
  let userRepository: Repository<UserEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(UserEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    userRepository = module.get<Repository<UserEntity>>(
      getRepositoryToken(UserEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    it('should return a user by email', async () => {
      const userEntity = new UserEntity();
      userEntity.email = 'test@example.com';
      jest.spyOn(userRepository, 'findOne').mockResolvedValueOnce(userEntity);
      expect(await service.findOne('test@example.com')).toEqual(userEntity);
      expect(userRepository.findOne).toHaveBeenCalledWith({
        where: { email: 'test@example.com' },
      });
    });
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const userDto: CreateUserDto = {
        email: 'test@example.com',
        password: 'password',
      };
      const userEntity = new UserEntity();
      userEntity.email = userDto.email;
      userEntity.password = await bcrypt.hash(
        userDto.password,
        await bcrypt.genSalt(),
      );
      jest.spyOn(userRepository, 'save').mockResolvedValueOnce(userEntity);
      const createdUser = await service.create(userDto);
      expect(createdUser.email).toEqual(userDto.email);
      expect(
        bcrypt.compare(userDto.password, createdUser.password),
      ).toBeTruthy();
    });
  });
});
