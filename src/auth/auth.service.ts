import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';

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
    const userRegistered = await this.usersService.createUser(registerDto);
    return userRegistered;
  }
  login() {
    return 'login';
  }
}
