import { Schema } from 'mongoose';

export const BlacklistSchema = new Schema({
  userId: { type: Number, required: true },
  deletedAt: { type: Date, required: true },
});

