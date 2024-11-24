import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BlacklistService } from './services/blacklist.service';
import { BlacklistController } from './blacklist.controller';
import { BlacklistSchema } from './schemas/blacklist.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Blacklist', schema: BlacklistSchema }]),
  ],
  providers: [BlacklistService],
  controllers: [BlacklistController],
  exports: [BlacklistService],
})
export class BlacklistModule {}

