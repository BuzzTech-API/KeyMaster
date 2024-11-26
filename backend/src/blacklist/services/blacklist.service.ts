import { Injectable} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Blacklist } from '../interfaces/blacklist.interface';
import { Logger } from '../../utils/Logger';

@Injectable()
export class BlacklistService {
  constructor(@InjectModel('Blacklist') private readonly blacklistModel: Model<Blacklist>) {}


  // Ivan Germano: Esta função adiciona os usuários que optaram pelo delete de seus dados no nosso sistema ao nosso BD NoSQL - MongoDB
  async addUserToBlacklist(userId: number): Promise<Blacklist> {
    const deletedAt = new Date();
    const blacklistEntry = new this.blacklistModel({ userId, deletedAt });
    Logger.log('blacklist', `Usuário ${userId}, adicionado a blacklist`);
    return await blacklistEntry.save();
  }

  // Ivan Germano: Esta função confere no MongoDB se o usuário faz parte da Blacklist
  async isUserBlacklisted(userId: number): Promise<boolean> {
    const result = await this.blacklistModel.findOne({ userId });
    return !!result;
  }

  // Ivan Germano: Esta função pega todos os usuários que estão na BlackList no MongoDB
  async getAllBlacklistedUsers(): Promise<Blacklist[]> {
    return await this.blacklistModel.find().exec();
  }
}

