import { Document } from 'mongoose';

export interface Blacklist extends Document {
  userId: number;
  deletedAt: Date;
}
