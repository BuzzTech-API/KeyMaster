import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Blacklist } from '../interfaces/blacklist.interface';

@Injectable()
export class BlacklistService {
  constructor(@InjectModel('Blacklist') private readonly blacklistModel: Model<Blacklist>) {}

  async addUserToBlacklist(userId: number): Promise<Blacklist> {
    const deletedAt = new Date();
    const blacklistEntry = new this.blacklistModel({ userId, deletedAt });
    console.log(`Usuário ${userId}, adicionado a blacklist`);
    return await blacklistEntry.save();
  }

  async isUserBlacklisted(userId: number): Promise<boolean> {
    const result = await this.blacklistModel.findOne({ userId });
    return !!result;
  }

  async getAllBlacklistedUsers(): Promise<Blacklist[]> {
    return await this.blacklistModel.find().exec();
  }
}

