import { Schema, model } from 'mongoose';

const activitySchema = new Schema(
  {
    username: { type: String, required: true },
    type: { type: String, required: true },
    durationMinutes: { type: Number, required: true, min: 1 },
    caloriesBurned: { type: Number, required: true, min: 0 },
    loggedAt: { type: Date, required: true },
    notes: { type: String, required: true },
  },
  { timestamps: true },
);

export const Activity = model('Activity', activitySchema, 'activities');