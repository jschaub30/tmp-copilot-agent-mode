import { Schema, model } from 'mongoose';

const teamSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    memberCount: { type: Number, required: true, min: 0 },
    weeklyGoalMinutes: { type: Number, required: true, min: 0 },
    captain: { type: String, required: true },
  },
  { timestamps: true },
);

export const Team = model('Team', teamSchema, 'teams');