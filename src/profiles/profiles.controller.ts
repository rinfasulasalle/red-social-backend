import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Controller('profiles')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Post(':id')
  createProfile(
    @Param('id', ParseIntPipe) id: number,
    @Body() profile: CreateProfileDto,
  ) {
    return this.profilesService.createProfile(id, profile);
  }

  @Get()
  getProfiles() {
    return this.profilesService.getProfiles();
  }

  @Get(':id')
  getProfile(@Param('id', ParseIntPipe) id: number) {
    return this.profilesService.getProfile(id);
  }

  @Patch(':id')
  updateProfile(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProfileDto: UpdateProfileDto,
  ) {
    return this.profilesService.updateProfile(id, updateProfileDto);
  }

  @Delete(':id')
  deleteProfile(@Param('id', ParseIntPipe) id: number) {
    return this.profilesService.deleteProfile(id);
  }
}
