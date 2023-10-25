import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async findOne(email: string): Promise<UserEntity | undefined> {
    return this.userRepository.findOne({ where: { email } });
  }

  async create(userDto: CreateUserDto): Promise<UserEntity> {
    const user = new UserEntity();
    user.email = userDto.email;

    // Хеширование пароля перед сохранением
    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(userDto.password, salt);

    // Задайте другие необходимые поля и сохраните пользователя
    return await this.userRepository.save(user);
  }
  //
}
