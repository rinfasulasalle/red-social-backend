import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';

import * as bcryptjs from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  //register
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
  // login
  async login(loginDto: LoginDto) {
    const userFound = await this.usersService.findOneByUsername(
      loginDto.username,
    );
    if (!userFound) {
      return new HttpException('Invalid username', HttpStatus.UNAUTHORIZED);
    }
    // se puede dar info exacta dependeiedo del sistema

    // si existe validamos contraseña
    const isPasswordValid = await bcryptjs.compare(
      loginDto.password,
      userFound.password,
    );
    if (!isPasswordValid) {
      return new HttpException('Invalid password', HttpStatus.UNAUTHORIZED);
    }
    // se devuelvo token, no usuario
    // return userFound;
  }
}
