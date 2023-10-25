import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SessionEntity } from './session.entity';
import { UserEntity } from 'src/users/user.entity';

@Injectable()
export class SessionService {
  constructor(
    @InjectRepository(SessionEntity)
    private sessionRepository: Repository<SessionEntity>,
  ) {}

  async create(
    jwt: string,
    user: UserEntity,
    deviceType: string,
  ): Promise<SessionEntity> {
    const session = this.sessionRepository.create({ jwt, user, deviceType });
    return this.sessionRepository.save(session);
  }

  async findByUser(user: UserEntity): Promise<SessionEntity[]> {
    return this.sessionRepository
      .createQueryBuilder('session')
      .innerJoinAndSelect('session.user', 'user', 'user.id = :userId', {
        userId: user.id,
      })
      .getMany();
  }

  async delete(jwt: string): Promise<void> {
    await this.sessionRepository.delete({ jwt });
  }
}
