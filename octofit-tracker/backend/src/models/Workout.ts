import { Schema, model } from 'mongoose';

const workoutSchema = new Schema(
  {
    title: { type: String, required: true },
    focus: { type: String, required: true },
    level: { type: String, required: true },
    durationMinutes: { type: Number, required: true, min: 1 },
    equipment: { type: [String], default: [] },
    steps: { type: [String], required: true },
  },
  { timestamps: true },
);

export const Workout = model('Workout', workoutSchema, 'workouts');