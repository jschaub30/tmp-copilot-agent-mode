import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    displayName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    profileImage: { type: String, required: true },
    teamName: { type: String, required: true },
    goal: { type: String, required: true },
    activeMinutes: { type: Number, required: true, min: 0 },
  },
  { timestamps: true },
);

export const User = model('User', userSchema, 'users');