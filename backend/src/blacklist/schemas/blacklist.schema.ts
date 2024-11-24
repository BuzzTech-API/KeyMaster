import { Schema } from 'mongoose';

export const BlacklistSchema = new Schema({
  userId: { type: String, required: true },
  deletedAt: { type: Date, required: true },
});

