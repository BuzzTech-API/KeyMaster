import { Document } from 'mongoose';

export interface Blacklist extends Document {
  userId: string;
  deletedAt: Date;
}
