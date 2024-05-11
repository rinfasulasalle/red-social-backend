import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { Profile } from './entities/profile.entity';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Profile) private profileRepository: Repository<Profile>,
  ) {}
  async createProfile(id: number, profile: CreateProfileDto) {
    const userFound = await this.userRepository.findOne({
      where: {
        id,
      },
      relations: ['profile'],
    });
    if (!userFound) {
      return new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    if (userFound.profile) {
      return new HttpException(
        'User already has a profile',
        HttpStatus.BAD_REQUEST,
      );
    }

    const newProfile = this.profileRepository.create(profile);
    const savedProfile = await this.profileRepository.save(newProfile);

    userFound.profile = savedProfile;
    await this.userRepository.save(userFound); // Guardar el perfil en el usuario

    return savedProfile;
  }

  getProfiles() {
    return this.profileRepository.find();
  }

  async getProfile(id: number) {
    const userFound = await this.userRepository.findOne({
      where: {
        id,
      },
    });
    if (!userFound) {
      return new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    const profileFound = await this.profileRepository.findOne({
      where: {
        id,
      },
    });
    if (!profileFound) {
      return new HttpException('Profile not found', HttpStatus.NOT_FOUND);
    }
    userFound.profile = profileFound;
    return userFound;
  }

  async updateProfile(id: number, profile: UpdateProfileDto) {
    const profileFound = await this.profileRepository.findOne({
      where: {
        id,
      },
    });
    if (!profileFound) {
      return new HttpException('Profile not found', HttpStatus.NOT_FOUND);
    }
    const updatedProfile = Object.assign(profileFound, profile);
    return this.profileRepository.save(updatedProfile);
  }

  async deleteProfile(id: number) {
    // const result = await this.profileRepository.delete({ id });
    // if (result.affected === 0) {
    //   return new HttpException('Profile not found', HttpStatus.NOT_FOUND);
    // }
    // return result;
    return 'Elimiando perfil ' + id.toString();
  }
}
