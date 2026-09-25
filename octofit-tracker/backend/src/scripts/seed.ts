import mongoose from 'mongoose';
import { Activity, LeaderboardEntry, Team, User, Workout } from '../models/index.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');
    console.log('Seed the octofit_db database with test data');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      LeaderboardEntry.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    await Team.insertMany([
      {
        name: 'Trail Blazers',
        description: 'Outdoor-focused members chasing weekly distance and elevation goals.',
        memberCount: 4,
        weeklyGoalMinutes: 720,
        captain: 'Maya Chen',
      },
      {
        name: 'Core Crew',
        description: 'Strength and mobility group for consistent, balanced training.',
        memberCount: 3,
        weeklyGoalMinutes: 540,
        captain: 'Jordan Smith',
      },
      {
        name: 'Cardio Collective',
        description: 'High-energy team centered on running, cycling, and rowing.',
        memberCount: 5,
        weeklyGoalMinutes: 900,
        captain: 'Priya Patel',
      },
    ]);

    await User.insertMany([
      {
        username: 'maya.chen',
        displayName: 'Maya Chen',
        email: 'maya.chen@example.com',
        profileImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200',
        teamName: 'Trail Blazers',
        goal: 'Build endurance for a spring half marathon.',
        activeMinutes: 186,
      },
      {
        username: 'jordan.smith',
        displayName: 'Jordan Smith',
        email: 'jordan.smith@example.com',
        profileImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200',
        teamName: 'Core Crew',
        goal: 'Improve strength and stay pain-free at work.',
        activeMinutes: 142,
      },
      {
        username: 'priya.patel',
        displayName: 'Priya Patel',
        email: 'priya.patel@example.com',
        profileImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200',
        teamName: 'Cardio Collective',
        goal: 'Hit five cardio sessions every week.',
        activeMinutes: 214,
      },
    ]);

    await Activity.insertMany([
      {
        username: 'maya.chen',
        type: 'Trail run',
        durationMinutes: 52,
        caloriesBurned: 465,
        loggedAt: new Date('2026-09-22T13:30:00Z'),
        notes: 'Steady hill repeats with a controlled cooldown.',
      },
      {
        username: 'jordan.smith',
        type: 'Strength training',
        durationMinutes: 45,
        caloriesBurned: 320,
        loggedAt: new Date('2026-09-23T21:00:00Z'),
        notes: 'Full-body dumbbell circuit and mobility work.',
      },
      {
        username: 'priya.patel',
        type: 'Indoor cycling',
        durationMinutes: 60,
        caloriesBurned: 540,
        loggedAt: new Date('2026-09-24T12:15:00Z'),
        notes: 'Interval ride with sustained tempo blocks.',
      },
      {
        username: 'maya.chen',
        type: 'Yoga',
        durationMinutes: 28,
        caloriesBurned: 120,
        loggedAt: new Date('2026-09-25T11:45:00Z'),
        notes: 'Recovery flow focused on hips and hamstrings.',
      },
    ]);

    await LeaderboardEntry.insertMany([
      {
        rank: 1,
        username: 'priya.patel',
        teamName: 'Cardio Collective',
        points: 1280,
        activeMinutes: 214,
      },
      {
        rank: 2,
        username: 'maya.chen',
        teamName: 'Trail Blazers',
        points: 1125,
        activeMinutes: 186,
      },
      {
        rank: 3,
        username: 'jordan.smith',
        teamName: 'Core Crew',
        points: 940,
        activeMinutes: 142,
      },
    ]);

    await Workout.insertMany([
      {
        title: 'Lunch Break Strength',
        focus: 'Strength',
        level: 'Intermediate',
        durationMinutes: 32,
        equipment: ['Dumbbells', 'Mat'],
        steps: ['Warm up for 5 minutes', 'Complete 3 strength circuits', 'Finish with mobility'],
      },
      {
        title: 'Endurance Builder Ride',
        focus: 'Cardio',
        level: 'Beginner',
        durationMinutes: 40,
        equipment: ['Stationary bike'],
        steps: ['Easy spin warmup', 'Alternate tempo and recovery blocks', 'Cool down gradually'],
      },
      {
        title: 'Trail Recovery Flow',
        focus: 'Mobility',
        level: 'All levels',
        durationMinutes: 24,
        equipment: ['Mat'],
        steps: ['Breathe and reset posture', 'Open hips and calves', 'Hold relaxed hamstring stretches'],
      },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
