import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { BlacklistService } from './services/blacklist.service';

@Controller('blacklist')
export class BlacklistController {
  constructor(private readonly blacklistService: BlacklistService) {}

  @Post()
  async addToBlacklist(@Body('userId') userId: string) {
    return await this.blacklistService.addUserToBlacklist(userId);
  }

  @Get(':userId')
  async checkIfUserIsBlacklisted(@Param('userId') userId: string) {
    return await this.blacklistService.isUserBlacklisted(userId);
  }

  @Get()
  async getAllBlacklistedUsers() {
    return await this.blacklistService.getBlacklistedUsers();
  }
}
