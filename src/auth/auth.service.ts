import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';

import * as bcryptjs from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}
  async register(registerDto: RegisterDto) {
    const userFound = await this.usersService.findOneByUsername(
      registerDto.username,
    );
    if (userFound) {
      return new HttpException('User already exists', HttpStatus.CONFLICT);
    }
    // Se encripta la contraseña
    registerDto.password = await bcryptjs.hash(registerDto.password, 10);
    const userRegistered = await this.usersService.createUser(registerDto);
    return userRegistered;
  }
  login() {
    return 'login';
  }
}
